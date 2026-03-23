import { apiClient } from '../api-client';

export interface BankAccountResponse {
  id: string;
  accountType: 'Savings' | 'Checking' | 'Investment';
  accountNumber: string;
  balance: number;
  apy: number;
  currency: string;
  status: string;
}

export interface TransactionResponse {
  id: string;
  type: string;
  amount: number;
  fee: number;
  status: string;
  description: string;
  createdAt: string;
}

export interface LoanResponse {
  id: string;
  loanType: 'Personal' | 'Business' | 'Crypto-Backed';
  amount: number;
  term: number;
  interestRate: number;
  monthlyPayment: number;
  status: string;
}

export const bankingApi = {
  async getAccounts(walletAddress: string): Promise<{ success: boolean; accounts: BankAccountResponse[] }> {
    return apiClient.get(`/api/banking/accounts/${walletAddress}`);
  },

  async createAccount(walletAddress: string, accountType: string): Promise<{ success: boolean; account: BankAccountResponse }> {
    return apiClient.post('/api/banking/accounts', { walletAddress, accountType });
  },

  async deposit(walletAddress: string, accountId: string, amount: number, method: 'crypto' | 'bank'): Promise<{ success: boolean; account: BankAccountResponse; transaction: TransactionResponse }> {
    return apiClient.post('/api/banking/deposit', {
      walletAddress,
      accountId,
      amount,
      method,
    });
  },

  async withdraw(walletAddress: string, accountId: string, amount: number, method: 'crypto' | 'bank'): Promise<{ success: boolean; account: BankAccountResponse; transaction: TransactionResponse }> {
    return apiClient.post('/api/banking/withdraw', {
      walletAddress,
      accountId,
      amount,
      method,
    });
  },

  async transfer(walletAddress: string, fromAccountId: string, toAddress: string, amount: number): Promise<{ success: boolean; transaction: TransactionResponse }> {
    return apiClient.post('/api/banking/transfer', {
      walletAddress,
      fromAccountId,
      toAddress,
      amount,
    });
  },

  async applyForLoan(walletAddress: string, loanType: string, amount: number, term: number): Promise<{ success: boolean; loan: LoanResponse }> {
    return apiClient.post('/api/banking/loans/apply', {
      walletAddress,
      loanType,
      amount,
      term,
    });
  },
};
