import { v4 } from 'uuid';
export class BankAccount {
  private _balance = 5000;
  private _transactions: Transaction[] = [];
  constructor(public name: NameInfo) {}
  get balance() {
    return this._balance;
  }

  getLastTransaction(): Readonly<Transaction> | undefined {
    return this._transactions[0];
  }
  deposit(amountOfTransaction: number): void {
    this.applyTransaction(
      this.calculateTransaction({ type: 'deposit', amountOfTransaction })
    );
  }
  withdraw(amountOfTransaction: number): void {
    this.applyTransaction(
      this.calculateTransaction({ type: 'withdrawal', amountOfTransaction })
    );
  }
  private calculateTransaction(tx: BankTransaction): Transaction {
    const balanceAfterTransaction = this.calculateTransactionImpact(tx);
    const response: Transaction = {
      ...tx,
      id: 'TX' + v4(),
      balanceBeforeTransaction: this._balance,
      balanceAfterTransaction,
      posted: new Date().toISOString(),
    };
    return response;
  }
  private calculateTransactionImpact(tx: BankTransaction): number {
    switch (tx.type) {
      case 'deposit':
        return this._balance + tx.amountOfTransaction;
      case 'withdrawal':
        return this.balance - tx.amountOfTransaction;
    }
  }

  private applyTransaction(tx: Transaction) {
    this._balance = tx.balanceAfterTransaction;
    this._transactions = [tx, ...this._transactions];
  }
}

interface NameInfo {
  first: string;
  last: string;
  mi?: string;
}

type BankTransaction = {
  type: 'deposit' | 'withdrawal';
  amountOfTransaction: number;
};

export type Transaction = BankTransaction & {
  id: string;
  balanceBeforeTransaction: number;
  balanceAfterTransaction: number;
  posted: string; // An ISO-8601 string of the date and time of the transaction
};
