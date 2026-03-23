import { apiClient } from '../api-client';

export interface UserResponse {
  success: boolean;
  user: {
    id: string;
    walletAddress: string;
    email?: string;
    username?: string;
    creditScore: number;
    totalVolume: number;
    kycStatus: string;
  };
}

export interface PortfolioResponse {
  success: boolean;
  portfolio: {
    accounts: any[];
    totalBalance: number;
  };
}

export interface TransactionsResponse {
  success: boolean;
  transactions: any[];
}

export const userApi = {
  async getUser(walletAddress: string): Promise<UserResponse> {
    return apiClient.get(`/api/user/${walletAddress}`);
  },

  async getPortfolio(walletAddress: string): Promise<PortfolioResponse> {
    return apiClient.get(`/api/user/${walletAddress}/portfolio`);
  },

  async getTransactions(walletAddress: string, limit?: number): Promise<TransactionsResponse> {
    return apiClient.get(`/api/user/${walletAddress}/transactions`, { limit });
  },
};
