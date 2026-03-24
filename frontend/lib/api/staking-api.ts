import { apiClient } from '../api-client';

export const stakingApi = {
  async getPosition(walletAddress: string): Promise<{ success: boolean; position: any }> {
    return apiClient.get(`/api/staking/position/${walletAddress}`);
  },

  async stake(walletAddress: string, amount: number, lockPeriod: number = 30): Promise<{ success: boolean; position: any }> {
    return apiClient.post('/api/staking/stake', { walletAddress, amount, lockPeriod });
  },

  async unstake(walletAddress: string, amount: number): Promise<{ success: boolean; position: any; amountReceived: number }> {
    return apiClient.post('/api/staking/unstake', { walletAddress, amount });
  },

  async claimRewards(walletAddress: string): Promise<{ success: boolean; rewards: number; position: any }> {
    return apiClient.post('/api/staking/claim', { walletAddress });
  },
};
