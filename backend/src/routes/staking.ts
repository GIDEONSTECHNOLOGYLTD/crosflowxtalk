import express, { Router, Request, Response } from 'express';
import StakePosition from '../models/StakePosition';
import Transaction from '../models/Transaction';
import User from '../models/User';

const router: Router = express.Router();

const TIERS = [
  { name: 'Bronze', minAmount: 1000, apy: 12 },
  { name: 'Silver', minAmount: 10000, apy: 15 },
  { name: 'Gold', minAmount: 50000, apy: 18 },
  { name: 'Platinum', minAmount: 100000, apy: 22 },
];

const getTierForAmount = (amount: number) => {
  for (let i = TIERS.length - 1; i >= 0; i--) {
    if (amount >= TIERS[i].minAmount) return TIERS[i];
  }
  return TIERS[0];
};

router.get('/position/:walletAddress', async (req: Request, res: Response) => {
  try {
    const { walletAddress } = req.params;
    const position = await StakePosition.findOne({ walletAddress: walletAddress.toLowerCase() });
    res.json({ success: true, position });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch position' });
  }
});

router.post('/stake', async (req: Request, res: Response) => {
  try {
    const { walletAddress, amount, lockPeriod = 30 } = req.body;
    
    let user = await User.findOne({ walletAddress: walletAddress.toLowerCase() });
    if (!user) {
      user = await User.create({ walletAddress: walletAddress.toLowerCase(), referralCode: Math.random().toString(36).substring(7).toUpperCase() });
    }

    const tier = getTierForAmount(amount);
    const unlockDate = new Date(Date.now() + lockPeriod * 24 * 60 * 60 * 1000);

    let position = await StakePosition.findOne({ walletAddress: walletAddress.toLowerCase() });

    if (position) {
      position.amount += amount;
      const newTier = getTierForAmount(position.amount);
      position.tier = newTier.name;
      position.apy = newTier.apy;
      await position.save();
    } else {
      position = await StakePosition.create({
        userId: user._id,
        walletAddress: walletAddress.toLowerCase(),
        amount,
        tier: tier.name,
        apy: tier.apy,
        earned: 0,
        lockPeriod,
        unlockDate,
      });
    }

    await Transaction.create({
      userId: user._id,
      walletAddress: walletAddress.toLowerCase(),
      type: 'Stake',
      amount,
      fee: 0,
      status: 'Completed',
      description: `Stake ${amount} CFLOW`,
    });

    res.json({ success: true, position });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Staking failed' });
  }
});

router.post('/unstake', async (req: Request, res: Response) => {
  try {
    const { walletAddress, amount } = req.body;
    const position = await StakePosition.findOne({ walletAddress: walletAddress.toLowerCase() });
    if (!position) return res.status(404).json({ success: false, error: 'No stake found' });
    if (position.amount < amount) return res.status(400).json({ success: false, error: 'Insufficient staked amount' });

    const now = new Date();
    let finalAmount = amount;
    
    if (now < position.unlockDate) {
      finalAmount = amount * 0.95;
    }

    position.amount -= amount;
    
    if (position.amount === 0) {
      await StakePosition.deleteOne({ _id: position._id });
    } else {
      const newTier = getTierForAmount(position.amount);
      position.tier = newTier.name;
      position.apy = newTier.apy;
      await position.save();
    }

    const user = await User.findOne({ walletAddress: walletAddress.toLowerCase() });
    await Transaction.create({
      userId: user?._id,
      walletAddress: walletAddress.toLowerCase(),
      type: 'Unstake',
      amount: finalAmount,
      fee: amount - finalAmount,
      status: 'Completed',
      description: `Unstake ${amount} CFLOW`,
    });

    res.json({ success: true, position: position.amount > 0 ? position : null, amountReceived: finalAmount });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Unstaking failed' });
  }
});

router.post('/claim', async (req: Request, res: Response) => {
  try {
    const { walletAddress } = req.body;
    const position = await StakePosition.findOne({ walletAddress: walletAddress.toLowerCase() });
    if (!position) return res.status(404).json({ success: false, error: 'No stake found' });

    const rewards = position.earned;
    position.earned = 0;
    await position.save();

    const user = await User.findOne({ walletAddress: walletAddress.toLowerCase() });
    await Transaction.create({
      userId: user?._id,
      walletAddress: walletAddress.toLowerCase(),
      type: 'Interest',
      amount: rewards,
      fee: 0,
      status: 'Completed',
      description: `Claim ${rewards} CFLOW rewards`,
    });

    res.json({ success: true, rewards, position });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Claim failed' });
  }
});

export default router;
