import { apiClient } from '../api-client';

export const yieldApi = {
  async getVaults(): Promise<{ success: boolean; vaults: any[] }> {
    return apiClient.get('/api/yield/vaults');
  },

  async getPositions(walletAddress: string): Promise<{ success: boolean; positions: any[] }> {
    return apiClient.get(`/api/yield/positions/${walletAddress}`);
  },

  async deposit(walletAddress: string, vaultId: string, amount: number): Promise<{ success: boolean; position: any }> {
    return apiClient.post('/api/yield/deposit', { walletAddress, vaultId, amount });
  },

  async withdraw(walletAddress: string, vaultId: string, amount: number): Promise<{ success: boolean; position: any }> {
    return apiClient.post('/api/yield/withdraw', { walletAddress, vaultId, amount });
  },

  async compound(walletAddress: string, vaultId: string): Promise<{ success: boolean; position: any }> {
    return apiClient.post('/api/yield/compound', { walletAddress, vaultId });
  },
};
