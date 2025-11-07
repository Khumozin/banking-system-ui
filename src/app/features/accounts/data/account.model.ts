export interface Account {
  accountId: string;
  ownerName: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export interface AccountBalance {
  accountId: string;
  balance: number;
}
