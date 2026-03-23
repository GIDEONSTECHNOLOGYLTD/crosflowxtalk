import express, { Router, Request, Response } from 'express';
import Transaction from '../models/Transaction';
import User from '../models/User';

const router: Router = express.Router();

router.post('/quote', async (req: Request, res: Response) => {
  try {
    const { fromToken, toToken, fromChain, toChain, amount } = req.body;
    
    const rates: Record<string, number> = {
      'ETH-BNB': 0.98, 'BNB-ETH': 1.02, 'ETH-USDC': 2500,
      'USDC-ETH': 0.0004, 'MATIC-BNB': 0.002, 'SOL-ETH': 0.04,
    };

    const rateKey = `${fromToken}-${toToken}`;
    const rate = rates[rateKey] || 1.0;
    const toAmount = amount * rate;
    const fee = amount * 0.0015;

    res.json({
      success: true,
      quote: {
        fromToken, toToken, fromChain, toChain,
        fromAmount: amount, toAmount: toAmount - fee,
        rate, priceImpact: 0.05, fee,
        route: ['X-Talk Direct'], estimatedTime: 30,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to get quote' });
  }
});

router.post('/execute', async (req: Request, res: Response) => {
  try {
    const { walletAddress, quote } = req.body;
    const user = await User.findOne({ walletAddress: walletAddress.toLowerCase() });

    const transaction = await Transaction.create({
      userId: user?._id,
      walletAddress: walletAddress.toLowerCase(),
      type: 'Swap',
      fromToken: quote.fromToken,
      toToken: quote.toToken,
      fromChain: quote.fromChain,
      toChain: quote.toChain,
      amount: quote.fromAmount,
      fee: quote.fee,
      status: 'Completed',
      txHash: `0x${Math.random().toString(16).slice(2, 66)}`,
      description: `Swap ${quote.fromAmount} ${quote.fromToken} for ${quote.toAmount} ${quote.toToken}`,
      metadata: quote,
    });

    if (user) {
      user.totalVolume += quote.fromAmount;
      await user.save();
    }

    res.json({ success: true, transaction });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Swap execution failed' });
  }
});

export default router;
