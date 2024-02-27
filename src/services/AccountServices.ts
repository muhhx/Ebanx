import { db } from "../database";
import { NotFoundError } from "../errors/NotFoundError";
import { DepositParams, WithdrawParams, TransferParams } from "../types";

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

  static withdraw({ origin, amount }: WithdrawParams) {
    const currentBalance = db.account.getBalance(origin);
    if (currentBalance === null) throw new NotFoundError();
    const newBalance = currentBalance - amount;
    const data = db.account.updateBalance(origin, newBalance);
    return { origin: { id: data.id, balance: data.value } };
  }

  static transfer({ origin, destination, amount }: TransferParams) {
    const originBalance = db.account.getBalance(origin);
    const destBalance = db.account.getBalance(destination);
    if (originBalance === null) throw new NotFoundError();

    const newOriginBalance = originBalance - amount;
    const newDestBalance = (destBalance || 0) + amount;

    const dataOrigin = db.account.updateBalance(origin, newOriginBalance);
    const dataDest = db.account.updateOrCreateBalance(
      destination,
      newDestBalance
    );

    return {
      origin: { id: dataOrigin.id, balance: dataOrigin.value },
      destination: { id: dataDest.id, balance: dataDest.value },
    };
  }

  static reset() {
    db.account.clear();
  }
}

export { AccountServices };
