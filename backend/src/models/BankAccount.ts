import mongoose, { Schema, Document } from 'mongoose';

export interface IBankAccount extends Document {
  userId: mongoose.Types.ObjectId;
  walletAddress: string;
  accountType: 'Savings' | 'Checking' | 'Investment';
  accountNumber: string;
  balance: number;
  apy: number;
  currency: string;
  status: 'active' | 'frozen' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

const BankAccountSchema: Schema = new Schema({
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
  accountType: {
    type: String,
    enum: ['Savings', 'Checking', 'Investment'],
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    default: 0,
    min: 0,
  },
  apy: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'USD',
  },
  status: {
    type: String,
    enum: ['active', 'frozen', 'closed'],
    default: 'active',
  },
}, {
  timestamps: true,
});

BankAccountSchema.index({ walletAddress: 1 });
BankAccountSchema.index({ accountNumber: 1 });

export default mongoose.model<IBankAccount>('BankAccount', BankAccountSchema);
