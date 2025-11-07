export type TransactionType = 'DEPOSIT' | 'TRANSFER';
export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

export interface Transaction {
  transactionId: string;
  transactionType: TransactionType;
  sourceAccountId?: string;
  destinationAccountId: string;
  amount: number;
  status: TransactionStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAccount {
  ownerName: string;
  initialBalance: number;
}

export interface CreateDeposit {
  destinationAccountId: string;
  amount: number;
}

export interface CreateTransfer {
  sourceAccountId: string;
  destinationAccountId: string;
  amount: number;
}

export interface ApiError {
  message: string;
  status: number;
}
