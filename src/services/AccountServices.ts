import { db } from "../database";
import { NotFoundError } from "../errors/NotFoundError";

class AccountServices {
  static getBalance(accountId: string) {
    const currentBalance = db.account.getBalance(accountId);
    if (currentBalance === null) throw new NotFoundError();
    return currentBalance;
  }

  static reset() {
    db.account.clear();
  }
}

export { AccountServices };
