import { BalanceRequest, EventRequest, ApplicationRequest } from "../types";
import { NextFunction, Response } from "express";
import { AccountServices } from "../services/AccountServices";
class AccountController {
  async getBalance(req: BalanceRequest, res: Response, next: NextFunction) {
    try {
      const { account_id } = req.query;

      const balance = AccountServices.getBalance(account_id);

      return res.status(200).json(balance);
    } catch (error) {
      next(error);
    }
  }

  async handleEvent(req: EventRequest, res: Response, next: NextFunction) {
    try {
      const { type, destination, origin, amount } = req.body;

      return res.send("OK");
    } catch (error) {
      next(error);
    }
  }

  async reset(req: ApplicationRequest, res: Response, next: NextFunction) {
    try {
      AccountServices.reset();

      return res.status(200).send("OK");
    } catch (error) {
      next(error);
    }
  }
}

export { AccountController };
