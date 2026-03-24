import express, { Router, Request, Response } from 'express';
import User from '../models/User';
import { generateToken, verifyWalletSignature, createAuthChallenge } from '../middleware/auth';
import { body } from 'express-validator';
import { handleValidationErrors } from '../middleware/validation';
import { authLimiter } from '../middleware/rateLimiter';

const router: Router = express.Router();

const challenges = new Map<string, { message: string; timestamp: number }>();

router.post('/challenge', [
  authLimiter,
  body('walletAddress').matches(/^0x[a-fA-F0-9]{40}$/).withMessage('Invalid wallet address'),
  handleValidationErrors,
], async (req: Request, res: Response) => {
  try {
    const { walletAddress } = req.body;
    const message = createAuthChallenge(walletAddress);
    
    challenges.set(walletAddress.toLowerCase(), {
      message,
      timestamp: Date.now(),
    });

    setTimeout(() => challenges.delete(walletAddress.toLowerCase()), 5 * 60 * 1000);

    res.json({ success: true, message });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create challenge' });
  }
});

router.post('/verify', [
  authLimiter,
  body('walletAddress').matches(/^0x[a-fA-F0-9]{40}$/).withMessage('Invalid wallet address'),
  body('signature').isString().withMessage('Signature required'),
  handleValidationErrors,
], async (req: Request, res: Response) => {
  try {
    const { walletAddress, signature } = req.body;
    const challenge = challenges.get(walletAddress.toLowerCase());

    if (!challenge) {
      return res.status(400).json({ success: false, error: 'No challenge found. Request a new challenge.' });
    }

    if (Date.now() - challenge.timestamp > 5 * 60 * 1000) {
      challenges.delete(walletAddress.toLowerCase());
      return res.status(400).json({ success: false, error: 'Challenge expired' });
    }

    const isValid = await verifyWalletSignature(walletAddress, challenge.message, signature);
    
    if (!isValid) {
      return res.status(401).json({ success: false, error: 'Invalid signature' });
    }

    challenges.delete(walletAddress.toLowerCase());

    let user = await User.findOne({ walletAddress: walletAddress.toLowerCase() });
    if (!user) {
      user = await User.create({
        walletAddress: walletAddress.toLowerCase(),
        referralCode: Math.random().toString(36).substring(7).toUpperCase(),
      });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(walletAddress);

    res.json({
      success: true,
      token,
      user: {
        walletAddress: user.walletAddress,
        creditScore: user.creditScore,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Authentication failed' });
  }
});

export default router;
