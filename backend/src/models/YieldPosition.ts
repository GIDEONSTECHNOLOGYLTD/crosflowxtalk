import mongoose, { Schema, Document } from 'mongoose';

export interface IYieldPosition extends Document {
  userId: mongoose.Types.ObjectId;
  walletAddress: string;
  vaultId: string;
  vaultName: string;
  deposited: number;
  earned: number;
  apy: number;
  depositedAt: Date;
  lastCompoundAt?: Date;
}

const YieldPositionSchema: Schema = new Schema({
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
  vaultId: {
    type: String,
    required: true,
  },
  vaultName: {
    type: String,
    required: true,
  },
  deposited: {
    type: Number,
    required: true,
    min: 0,
  },
  earned: {
    type: Number,
    default: 0,
  },
  apy: {
    type: Number,
    required: true,
  },
  depositedAt: {
    type: Date,
    default: Date.now,
  },
  lastCompoundAt: Date,
});

YieldPositionSchema.index({ walletAddress: 1, vaultId: 1 });

export default mongoose.model<IYieldPosition>('YieldPosition', YieldPositionSchema);
