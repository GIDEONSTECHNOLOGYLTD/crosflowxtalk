import mongoose, { Schema, Document } from 'mongoose';

export interface ILoan extends Document {
  userId: mongoose.Types.ObjectId;
  walletAddress: string;
  loanType: 'Personal' | 'Business' | 'Crypto-Backed';
  amount: number;
  term: number; // months
  interestRate: number;
  monthlyPayment: number;
  totalInterest: number;
  remainingBalance: number;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Active' | 'Paid' | 'Defaulted';
  creditScore: number;
  collateral?: {
    type: string;
    amount: number;
    address: string;
  };
  appliedAt: Date;
  approvedAt?: Date;
  paidOffAt?: Date;
  nextPaymentDate?: Date;
}

const LoanSchema: Schema = new Schema({
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
  loanType: {
    type: String,
    enum: ['Personal', 'Business', 'Crypto-Backed'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 1000,
  },
  term: {
    type: Number,
    required: true,
  },
  interestRate: {
    type: Number,
    required: true,
  },
  monthlyPayment: {
    type: Number,
    required: true,
  },
  totalInterest: {
    type: Number,
    required: true,
  },
  remainingBalance: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Active', 'Paid', 'Defaulted'],
    default: 'Pending',
  },
  creditScore: {
    type: Number,
    required: true,
  },
  collateral: {
    type: {
      type: String,
    },
    amount: Number,
    address: String,
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
  approvedAt: Date,
  paidOffAt: Date,
  nextPaymentDate: Date,
});

LoanSchema.index({ walletAddress: 1, status: 1 });
LoanSchema.index({ userId: 1 });

export default mongoose.model<ILoan>('Loan', LoanSchema);
