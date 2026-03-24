import express, { Router, Request, Response } from 'express';
import YieldPosition from '../models/YieldPosition';
import Transaction from '../models/Transaction';
import User from '../models/User';

const router: Router = express.Router();

const VAULTS = [
  { id: 'vault-1', name: 'Stable Vault', apy: 12.5, risk: 'Low' },
  { id: 'vault-2', name: 'ETH Maximizer', apy: 18.3, risk: 'Medium' },
  { id: 'vault-3', name: 'Multi-Chain DeFi', apy: 25.7, risk: 'Medium' },
  { id: 'vault-4', name: 'High Yield', apy: 42.1, risk: 'High' },
];

router.get('/vaults', async (req: Request, res: Response) => {
  res.json({ success: true, vaults: VAULTS });
});

router.get('/positions/:walletAddress', async (req: Request, res: Response) => {
  try {
    const { walletAddress } = req.params;
    const positions = await YieldPosition.find({ walletAddress: walletAddress.toLowerCase() });
    res.json({ success: true, positions });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch positions' });
  }
});

router.post('/deposit', async (req: Request, res: Response) => {
  try {
    const { walletAddress, vaultId, amount } = req.body;
    const vault = VAULTS.find(v => v.id === vaultId);
    if (!vault) return res.status(404).json({ success: false, error: 'Vault not found' });

    let user = await User.findOne({ walletAddress: walletAddress.toLowerCase() });
    if (!user) {
      user = await User.create({ walletAddress: walletAddress.toLowerCase(), referralCode: Math.random().toString(36).substring(7).toUpperCase() });
    }

    let position = await YieldPosition.findOne({ walletAddress: walletAddress.toLowerCase(), vaultId });
    
    if (position) {
      position.deposited += amount;
      position.earned += amount * (vault.apy / 100) * 0.01;
      await position.save();
    } else {
      position = await YieldPosition.create({
        userId: user._id,
        walletAddress: walletAddress.toLowerCase(),
        vaultId,
        vaultName: vault.name,
        deposited: amount,
        earned: 0,
        apy: vault.apy,
      });
    }

    await Transaction.create({
      userId: user._id,
      walletAddress: walletAddress.toLowerCase(),
      type: 'Deposit',
      amount,
      fee: 0,
      status: 'Completed',
      description: `Deposit to ${vault.name}`,
      metadata: { vaultId },
    });

    res.json({ success: true, position });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Deposit failed' });
  }
});

router.post('/withdraw', async (req: Request, res: Response) => {
  try {
    const { walletAddress, vaultId, amount } = req.body;
    const position = await YieldPosition.findOne({ walletAddress: walletAddress.toLowerCase(), vaultId });
    if (!position) return res.status(404).json({ success: false, error: 'No position found' });
    if (position.deposited < amount) return res.status(400).json({ success: false, error: 'Insufficient balance' });

    position.deposited -= amount;
    if (position.deposited === 0) {
      await YieldPosition.deleteOne({ _id: position._id });
    } else {
      await position.save();
    }

    const user = await User.findOne({ walletAddress: walletAddress.toLowerCase() });
    await Transaction.create({
      userId: user?._id,
      walletAddress: walletAddress.toLowerCase(),
      type: 'Withdrawal',
      amount,
      fee: 0,
      status: 'Completed',
      description: `Withdraw from ${position.vaultName}`,
    });

    res.json({ success: true, position: position.deposited > 0 ? position : null });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Withdrawal failed' });
  }
});

router.post('/compound', async (req: Request, res: Response) => {
  try {
    const { walletAddress, vaultId } = req.body;
    const position = await YieldPosition.findOne({ walletAddress: walletAddress.toLowerCase(), vaultId });
    if (!position) return res.status(404).json({ success: false, error: 'No position found' });

    position.deposited += position.earned;
    position.earned = 0;
    position.lastCompoundAt = new Date();
    await position.save();

    res.json({ success: true, position });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Compound failed' });
  }
});

export default router;
