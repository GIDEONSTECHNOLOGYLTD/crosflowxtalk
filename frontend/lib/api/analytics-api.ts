import { apiClient } from '../api-client';

export interface AnalyticsStatsResponse {
  success: boolean;
  stats: {
    totalUsers: number;
    totalAccounts: number;
    totalTransactions: number;
    totalTVL: number;
    volume24h: number;
  };
}

export interface VolumeDataResponse {
  success: boolean;
  volumeData: Array<{
    _id: string;
    volume: number;
  }>;
}

export const analyticsApi = {
  async getStats(): Promise<AnalyticsStatsResponse> {
    return apiClient.get('/api/analytics/stats');
  },

  async getVolumeData(days: number = 7): Promise<VolumeDataResponse> {
    return apiClient.get('/api/analytics/volume', { days });
  },
};
