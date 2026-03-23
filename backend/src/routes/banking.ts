import express, { Router, Request, Response } from 'express';
import BankAccount from '../models/BankAccount';
import Transaction from '../models/Transaction';
import Loan from '../models/Loan';
import User from '../models/User';

const router: Router = express.Router();

router.get('/accounts/:walletAddress', async (req: Request, res: Response) => {
  try {
    const { walletAddress } = req.params;
    const accounts = await BankAccount.find({ 
      walletAddress: walletAddress.toLowerCase(),
      status: 'active',
    });
    res.json({ success: true, accounts });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch accounts' });
  }
});

router.post('/accounts', async (req: Request, res: Response) => {
  try {
    const { walletAddress, accountType } = req.body;
    
    let user = await User.findOne({ walletAddress: walletAddress.toLowerCase() });
    if (!user) {
      user = await User.create({ 
        walletAddress: walletAddress.toLowerCase(),
        referralCode: Math.random().toString(36).substring(7).toUpperCase(),
      });
    }

    const apyRates = { Savings: 5.2, Checking: 0.5, Investment: 12.5 };
    const accountNumber = `****${Math.floor(1000 + Math.random() * 9000)}`;

    const account = await BankAccount.create({
      userId: user._id,
      walletAddress: walletAddress.toLowerCase(),
      accountType,
      accountNumber,
      balance: 0,
      apy: apyRates[accountType as keyof typeof apyRates],
      currency: 'USD',
    });

    res.json({ success: true, account });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create account' });
  }
});

router.post('/deposit', async (req: Request, res: Response) => {
  try {
    const { walletAddress, accountId, amount, method } = req.body;
    const account = await BankAccount.findById(accountId);
    if (!account) return res.status(404).json({ success: false, error: 'Account not found' });

    account.balance += amount;
    await account.save();

    const user = await User.findOne({ walletAddress: walletAddress.toLowerCase() });
    const transaction = await Transaction.create({
      userId: user?._id,
      walletAddress: walletAddress.toLowerCase(),
      type: 'Deposit',
      toAccount: accountId,
      amount,
      fee: 0,
      status: 'Completed',
      description: `${method} deposit`,
    });

    res.json({ success: true, account, transaction });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Deposit failed' });
  }
});

router.post('/withdraw', async (req: Request, res: Response) => {
  try {
    const { walletAddress, accountId, amount, method } = req.body;
    const account = await BankAccount.findById(accountId);
    if (!account) return res.status(404).json({ success: false, error: 'Account not found' });
    if (account.balance < amount) return res.status(400).json({ success: false, error: 'Insufficient balance' });

    account.balance -= amount;
    await account.save();

    const user = await User.findOne({ walletAddress: walletAddress.toLowerCase() });
    const transaction = await Transaction.create({
      userId: user?._id,
      walletAddress: walletAddress.toLowerCase(),
      type: 'Withdrawal',
      fromAccount: accountId,
      amount,
      fee: 0,
      status: 'Completed',
      description: `${method} withdrawal`,
    });

    res.json({ success: true, account, transaction });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Withdrawal failed' });
  }
});

router.post('/loans/apply', async (req: Request, res: Response) => {
  try {
    const { walletAddress, loanType, amount, term } = req.body;
    const user = await User.findOne({ walletAddress: walletAddress.toLowerCase() });
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });

    const rates = { Personal: 6.5, Business: 5.2, 'Crypto-Backed': 4.8 };
    const rate = rates[loanType as keyof typeof rates];
    const monthlyRate = rate / 100 / 12;
    const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);

    const loan = await Loan.create({
      userId: user._id,
      walletAddress: walletAddress.toLowerCase(),
      loanType,
      amount,
      term,
      interestRate: rate,
      monthlyPayment,
      totalInterest: (monthlyPayment * term) - amount,
      remainingBalance: amount,
      creditScore: user.creditScore,
      status: user.creditScore >= 600 ? 'Approved' : 'Rejected',
    });

    res.json({ success: true, loan });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Loan application failed' });
  }
});

export default router;
