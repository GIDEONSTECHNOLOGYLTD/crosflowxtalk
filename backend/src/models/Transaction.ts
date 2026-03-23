import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  userId: mongoose.Types.ObjectId;
  walletAddress: string;
  type: 'Deposit' | 'Withdrawal' | 'Transfer' | 'Swap' | 'Stake' | 'Unstake' | 'Loan Payment' | 'Interest';
  fromAccount?: string;
  toAccount?: string;
  fromToken?: string;
  toToken?: string;
  fromChain?: string;
  toChain?: string;
  amount: number;
  fee: number;
  status: 'Pending' | 'Processing' | 'Completed' | 'Failed';
  txHash?: string;
  description: string;
  metadata?: any;
  createdAt: Date;
  completedAt?: Date;
}

const TransactionSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  walletAddress: {
    type: String,
    required: true,
    lowercase: true,
  },
  type: {
    type: String,
    enum: ['Deposit', 'Withdrawal', 'Transfer', 'Swap', 'Stake', 'Unstake', 'Loan Payment', 'Interest'],
    required: true,
  },
  fromAccount: String,
  toAccount: String,
  fromToken: String,
  toToken: String,
  fromChain: String,
  toChain: String,
  amount: {
    type: Number,
    required: true,
  },
  fee: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Completed', 'Failed'],
    default: 'Pending',
  },
  txHash: String,
  description: {
    type: String,
    required: true,
  },
  metadata: Schema.Types.Mixed,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: Date,
});

TransactionSchema.index({ walletAddress: 1, createdAt: -1 });
TransactionSchema.index({ userId: 1, createdAt: -1 });
TransactionSchema.index({ txHash: 1 });
TransactionSchema.index({ status: 1 });

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
