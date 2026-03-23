import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  walletAddress: string;
  email?: string;
  username?: string;
  createdAt: Date;
  lastLogin: Date;
  kycStatus: 'pending' | 'verified' | 'rejected';
  creditScore: number;
  totalVolume: number;
  referralCode: string;
}

const UserSchema: Schema = new Schema({
  walletAddress: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    sparse: true,
    lowercase: true,
  },
  username: {
    type: String,
    sparse: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  kycStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending',
  },
  creditScore: {
    type: Number,
    default: 700,
    min: 300,
    max: 850,
  },
  totalVolume: {
    type: Number,
    default: 0,
  },
  referralCode: {
    type: String,
    unique: true,
  },
});

UserSchema.index({ walletAddress: 1 });
UserSchema.index({ email: 1 });

export default mongoose.model<IUser>('User', UserSchema);
