import { BalanceRequest, EventRequest, ApplicationRequest } from "../types";
import { NextFunction, Response } from "express";

class AccountController {
  async getBalance(req: BalanceRequest, res: Response, next: NextFunction) {
    try {
      const { account_id } = req.query;
    } catch (error) {
      next(error);
    }
  }

  async handleEvent(req: EventRequest, res: Response, next: NextFunction) {
    try {
      const { type, destination, origin, amount } = req.body;
    } catch (error) {
      next(error);
    }
  }

  async reset(req: ApplicationRequest, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

export { AccountController };
