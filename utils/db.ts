// db.ts
import Dexie, { Table } from 'dexie';

export interface Bills {
  createdAt: string;
  amount: number;
  description: string;
  fixed: boolean;
  userId: string;
}


export class MySubClassedDexie extends Dexie {

  incomes!: Table<Bills>;
  expenses!: Table<Bills>;

  constructor() {
    super('cachedBills');
    this.version(1).stores({
      incomes: '++id, createdAt, amount, description, fixed, userId',
    });

    this.version(1).stores({
      expenses: '++id, createdAt, amount, description, fixed, userId',
    });
  }
}

export const db = new MySubClassedDexie();