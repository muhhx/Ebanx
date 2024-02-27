import { Router } from "express";

import { eventBodySchema } from "../utils/eventBodySchema";
import { validateBody } from "../middlewares/validationMiddleware";

class AccountRouter {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  run() {
    this.routes();
    return this.router;
  }

  private routes() {
    this.router.post("/reset");
    this.router.get("/balance");
    this.router.post("/event", validateBody(eventBodySchema));
  }
}

export { AccountRouter };
