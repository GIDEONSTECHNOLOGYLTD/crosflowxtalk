import express, { Router, Request, Response } from 'express';
import Transaction from '../models/Transaction';
import User from '../models/User';
import BankAccount from '../models/BankAccount';

const router: Router = express.Router();

router.get('/stats', async (req: Request, res: Response) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAccounts = await BankAccount.countDocuments({ status: 'active' });
    const totalTransactions = await Transaction.countDocuments();
    
    const accounts = await BankAccount.find({ status: 'active' });
    const totalTVL = accounts.reduce((sum, acc) => sum + acc.balance, 0);

    const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const volume24h = await Transaction.aggregate([
      { $match: { createdAt: { $gte: last24h }, status: 'Completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalAccounts,
        totalTransactions,
        totalTVL,
        volume24h: volume24h[0]?.total || 0,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch stats' });
  }
});

router.get('/volume', async (req: Request, res: Response) => {
  try {
    const days = parseInt(req.query.days as string) || 7;
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const volumeData = await Transaction.aggregate([
      { $match: { createdAt: { $gte: startDate }, status: 'Completed' } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          volume: { $sum: '$amount' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({ success: true, volumeData });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch volume data' });
  }
});

export default router;
