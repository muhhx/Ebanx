import { Router } from "express";

import { AccountController } from "../controllers/AccountController";

import { eventBodySchema } from "../utils/eventBodySchema";
import { validateBody } from "../middlewares/validationMiddleware";

class AccountRouter {
  private router: Router;
  private accountController: AccountController;

  constructor() {
    this.router = Router();
    this.accountController = new AccountController();
  }

  run() {
    this.routes();
    return this.router;
  }

  private routes() {
    this.router.post("/reset", this.accountController.reset);
    this.router.get("/balance", this.accountController.getBalance);
    this.router.post(
      "/event",
      validateBody(eventBodySchema),
      this.accountController.handleEvent
    );
  }
}

export { AccountRouter };
