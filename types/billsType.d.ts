export type BillType = {
  id: string;
  groupId: string;
  billType: string;
  description: string;
  isPaid: boolean;
  amount: number;
  fixed: boolean;
  userId: string;
  createdAt: string;
  expiresAt: string;
  updatedAt: string;
  installment: number;
  totalInstallments: number;
}

export type CreateBillType = {
  description: string;
  amount: number;
  fixed: boolean;
  userId: string;
  createdAt: string;
  totalInstallments: number;
}