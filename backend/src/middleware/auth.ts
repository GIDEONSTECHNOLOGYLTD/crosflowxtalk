import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ethers } from 'ethers';

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_in_production';

export interface AuthRequest extends Request {
  user?: {
    walletAddress: string;
  };
}

export const generateToken = (walletAddress: string): string => {
  return jwt.sign({ walletAddress: walletAddress.toLowerCase() }, JWT_SECRET, {
    expiresIn: '7d',
  });
};

export const verifyToken = (token: string): { walletAddress: string } | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { walletAddress: string };
    return decoded;
  } catch (error) {
    return null;
  }
};

export const authenticateWallet = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ success: false, error: 'No authentication token provided' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ success: false, error: 'Invalid or expired token' });
    }

    const requestedWallet = req.params.walletAddress || req.body.walletAddress;
    if (requestedWallet && decoded.walletAddress !== requestedWallet.toLowerCase()) {
      return res.status(403).json({ success: false, error: 'Unauthorized access to wallet' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Authentication failed' });
  }
};

export const verifyWalletSignature = async (
  walletAddress: string,
  message: string,
  signature: string
): Promise<boolean> => {
  try {
    const recoveredAddress = ethers.verifyMessage(message, signature);
    return recoveredAddress.toLowerCase() === walletAddress.toLowerCase();
  } catch (error) {
    return false;
  }
};

export const createAuthChallenge = (walletAddress: string): string => {
  const nonce = Math.random().toString(36).substring(7);
  const timestamp = Date.now();
  return `Sign this message to authenticate with CrossFlow Protocol\n\nWallet: ${walletAddress}\nNonce: ${nonce}\nTimestamp: ${timestamp}`;
};
