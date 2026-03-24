// Transform MongoDB documents to frontend-compatible format

export const transformAccount = (account: any) => {
  return {
    id: account._id.toString(),
    accountType: account.accountType,
    accountNumber: account.accountNumber,
    balance: account.balance,
    apy: account.apy,
    currency: account.currency,
    status: account.status,
    createdAt: account.createdAt?.toISOString(),
    updatedAt: account.updatedAt?.toISOString(),
  };
};

export const transformTransaction = (transaction: any) => {
  return {
    id: transaction._id.toString(),
    type: transaction.type,
    amount: transaction.amount,
    fee: transaction.fee,
    status: transaction.status,
    description: transaction.description,
    txHash: transaction.txHash,
    fromAccount: transaction.fromAccount,
    toAccount: transaction.toAccount,
    fromToken: transaction.fromToken,
    toToken: transaction.toToken,
    fromChain: transaction.fromChain,
    toChain: transaction.toChain,
    createdAt: transaction.createdAt?.toISOString(),
    completedAt: transaction.completedAt?.toISOString(),
  };
};

export const transformUser = (user: any) => {
  return {
    id: user._id.toString(),
    walletAddress: user.walletAddress,
    email: user.email,
    username: user.username,
    creditScore: user.creditScore,
    totalVolume: user.totalVolume,
    kycStatus: user.kycStatus,
    createdAt: user.createdAt?.toISOString(),
    lastLogin: user.lastLogin?.toISOString(),
  };
};

export const transformLoan = (loan: any) => {
  return {
    id: loan._id.toString(),
    loanType: loan.loanType,
    amount: loan.amount,
    term: loan.term,
    interestRate: loan.interestRate,
    monthlyPayment: loan.monthlyPayment,
    totalInterest: loan.totalInterest,
    remainingBalance: loan.remainingBalance,
    status: loan.status,
    creditScore: loan.creditScore,
    appliedAt: loan.appliedAt?.toISOString(),
    approvedAt: loan.approvedAt?.toISOString(),
  };
};
