import { apiClient } from '../api-client';

export interface SwapQuoteResponse {
  success: boolean;
  quote: {
    fromToken: string;
    toToken: string;
    fromChain: string;
    toChain: string;
    fromAmount: number;
    toAmount: number;
    rate: number;
    priceImpact: number;
    fee: number;
    route: string[];
    estimatedTime: number;
  };
}

export interface SwapExecuteResponse {
  success: boolean;
  transaction: {
    id: string;
    txHash: string;
    status: string;
    amount: number;
    fee: number;
  };
}

export const swapApi = {
  async getQuote(
    fromToken: string,
    toToken: string,
    fromChain: string,
    toChain: string,
    amount: number
  ): Promise<SwapQuoteResponse> {
    return apiClient.post('/api/swap/quote', {
      fromToken,
      toToken,
      fromChain,
      toChain,
      amount,
    });
  },

  async executeSwap(walletAddress: string, quote: any): Promise<SwapExecuteResponse> {
    return apiClient.post('/api/swap/execute', {
      walletAddress,
      quote,
    });
  },
};
