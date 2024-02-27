import { db } from "../database";
import { NotFoundError } from "../errors/NotFoundError";
import { DepositParams } from "../types";

class AccountServices {
  static getBalance(accountId: string) {
    const currentBalance = db.account.getBalance(accountId);
    if (currentBalance === null) throw new NotFoundError();
    return currentBalance;
  }

  static deposit({ destination, amount }: DepositParams) {
    const currentBalance = db.account.getBalance(destination);
    const newBalance = (currentBalance || 0) + amount;
    const data = db.account.updateOrCreateBalance(destination, newBalance);
    return { destination: { id: data.id, balance: data.value } };
  }

  static reset() {
    db.account.clear();
  }
}

export { AccountServices };
