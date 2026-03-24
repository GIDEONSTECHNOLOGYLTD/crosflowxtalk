import express, { Router, Request, Response } from 'express';
import User from '../models/User';
import BankAccount from '../models/BankAccount';
import Transaction from '../models/Transaction';
import { transformUser, transformAccount, transformTransaction } from '../utils/transformers';

const router: Router = express.Router();

router.get('/:walletAddress', async (req: Request, res: Response) => {
  try {
    const { walletAddress } = req.params;
    let user = await User.findOne({ walletAddress: walletAddress.toLowerCase() });
    
    if (!user) {
      user = await User.create({
        walletAddress: walletAddress.toLowerCase(),
        referralCode: Math.random().toString(36).substring(7).toUpperCase(),
      });
    }

    res.json({ success: true, user: transformUser(user) });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch user' });
  }
});

router.get('/:walletAddress/portfolio', async (req: Request, res: Response) => {
  try {
    const { walletAddress } = req.params;
    const accounts = await BankAccount.find({ walletAddress: walletAddress.toLowerCase() });
    const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

    res.json({
      success: true,
      portfolio: { 
        accounts: accounts.map(transformAccount), 
        totalBalance 
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch portfolio' });
  }
});

router.get('/:walletAddress/transactions', async (req: Request, res: Response) => {
  try {
    const { walletAddress } = req.params;
    const limit = parseInt(req.query.limit as string) || 50;
    
    const transactions = await Transaction.find({ 
      walletAddress: walletAddress.toLowerCase() 
    })
      .sort({ createdAt: -1 })
      .limit(limit);

    res.json({ success: true, transactions: transactions.map(transformTransaction) });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch transactions' });
  }
});

export default router;
