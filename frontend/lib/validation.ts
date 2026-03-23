// Form validation utilities

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateAmount = (amount: string, balance?: string): ValidationResult => {
  if (!amount || amount === "") {
    return { isValid: false, error: "Amount is required" };
  }

  const numAmount = parseFloat(amount);
  
  if (isNaN(numAmount)) {
    return { isValid: false, error: "Invalid amount" };
  }

  if (numAmount <= 0) {
    return { isValid: false, error: "Amount must be greater than 0" };
  }

  if (balance) {
    const numBalance = parseFloat(balance);
    if (numAmount > numBalance) {
      return { isValid: false, error: "Insufficient balance" };
    }
  }

  return { isValid: true };
};

export const validateAddress = (address: string): ValidationResult => {
  if (!address || address === "") {
    return { isValid: false, error: "Address is required" };
  }

  // Ethereum address validation
  if (address.startsWith("0x")) {
    if (address.length !== 42) {
      return { isValid: false, error: "Invalid Ethereum address" };
    }
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      return { isValid: false, error: "Invalid address format" };
    }
  }
  // Email validation
  else if (address.includes("@")) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) {
      return { isValid: false, error: "Invalid email address" };
    }
  } else {
    return { isValid: false, error: "Invalid address format" };
  }

  return { isValid: true };
};

export const validateSlippage = (slippage: string): ValidationResult => {
  const num = parseFloat(slippage);
  
  if (isNaN(num)) {
    return { isValid: false, error: "Invalid slippage" };
  }

  if (num < 0.1 || num > 50) {
    return { isValid: false, error: "Slippage must be between 0.1% and 50%" };
  }

  return { isValid: true };
};

export const validateLoanAmount = (amount: string, maxAmount: string): ValidationResult => {
  const validation = validateAmount(amount);
  if (!validation.isValid) return validation;

  const numAmount = parseFloat(amount);
  const numMax = parseFloat(maxAmount.replace(/[$,]/g, ""));

  if (numAmount > numMax) {
    return { isValid: false, error: `Maximum loan amount is ${maxAmount}` };
  }

  if (numAmount < 1000) {
    return { isValid: false, error: "Minimum loan amount is $1,000" };
  }

  return { isValid: true };
};

export const validateCreditScore = (score: number): { tier: string; approved: boolean } => {
  if (score >= 750) {
    return { tier: "Excellent", approved: true };
  } else if (score >= 700) {
    return { tier: "Good", approved: true };
  } else if (score >= 650) {
    return { tier: "Fair", approved: true };
  } else if (score >= 600) {
    return { tier: "Poor", approved: true };
  } else {
    return { tier: "Very Poor", approved: false };
  }
};

export const formatCurrency = (amount: number | string): string => {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(num);
};

export const formatAddress = (address: string): string => {
  if (address.length <= 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
