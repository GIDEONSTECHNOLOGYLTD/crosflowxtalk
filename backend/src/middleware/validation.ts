import { body, param, query, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      errors: errors.array().map(err => ({
        field: err.type === 'field' ? (err as any).path : 'unknown',
        message: err.msg
      }))
    });
  }
  next();
};

export const validateWalletAddress = () => 
  body('walletAddress')
    .isString()
    .matches(/^0x[a-fA-F0-9]{40}$/)
    .withMessage('Invalid Ethereum address');

export const validateAmount = () =>
  body('amount')
    .isFloat({ min: 0.01, max: 1000000 })
    .withMessage('Amount must be between 0.01 and 1,000,000');

export const validateAccountId = () =>
  body('accountId')
    .isMongoId()
    .withMessage('Invalid account ID');

export const validateWalletParam = () =>
  param('walletAddress')
    .isString()
    .matches(/^0x[a-fA-F0-9]{40}$/)
    .withMessage('Invalid wallet address');

export const validateLoanApplication = [
  validateWalletAddress(),
  body('loanType').isIn(['Personal', 'Business', 'Crypto-Backed']).withMessage('Invalid loan type'),
  body('amount').isFloat({ min: 1000, max: 250000 }).withMessage('Loan amount must be between $1,000 and $250,000'),
  body('term').isInt({ min: 12, max: 360 }).withMessage('Term must be between 12 and 360 months'),
  handleValidationErrors,
];

export const validateDeposit = [
  validateWalletAddress(),
  validateAccountId(),
  validateAmount(),
  body('method').isIn(['crypto', 'bank']).withMessage('Invalid payment method'),
  handleValidationErrors,
];

export const validateWithdraw = [
  validateWalletAddress(),
  validateAccountId(),
  validateAmount(),
  body('method').isIn(['crypto', 'bank']).withMessage('Invalid withdrawal method'),
  handleValidationErrors,
];

export const validateTransfer = [
  validateWalletAddress(),
  body('fromAccountId').isMongoId().withMessage('Invalid account ID'),
  body('toAddress').isString().withMessage('Recipient address required'),
  validateAmount(),
  handleValidationErrors,
];

export const validateSwapQuote = [
  body('fromToken').isString().isLength({ min: 2, max: 10 }).withMessage('Invalid from token'),
  body('toToken').isString().isLength({ min: 2, max: 10 }).withMessage('Invalid to token'),
  body('fromChain').isString().isLength({ min: 3, max: 20 }).withMessage('Invalid from chain'),
  body('toChain').isString().isLength({ min: 3, max: 20 }).withMessage('Invalid to chain'),
  body('amount').isFloat({ min: 0.000001, max: 100000 }).withMessage('Invalid amount'),
  handleValidationErrors,
];
