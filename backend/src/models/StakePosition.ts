import mongoose, { Schema, Document } from 'mongoose';

export interface IStakePosition extends Document {
  userId: mongoose.Types.ObjectId;
  walletAddress: string;
  amount: number;
  tier: string;
  apy: number;
  earned: number;
  stakedAt: Date;
  lockPeriod: number;
  unlockDate: Date;
}

const StakePositionSchema: Schema = new Schema({
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
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  tier: {
    type: String,
    required: true,
  },
  apy: {
    type: Number,
    required: true,
  },
  earned: {
    type: Number,
    default: 0,
  },
  stakedAt: {
    type: Date,
    default: Date.now,
  },
  lockPeriod: {
    type: Number,
    required: true,
  },
  unlockDate: {
    type: Date,
    required: true,
  },
});

StakePositionSchema.index({ walletAddress: 1 });

export default mongoose.model<IStakePosition>('StakePosition', StakePositionSchema);
