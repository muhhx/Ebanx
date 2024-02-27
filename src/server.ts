import express from "express";
import cors from "cors";

import { AccountRouter } from "./routes/AccountRouter";
import { errorMiddleware } from "./middlewares/errorMiddleware";

class App {
  private server: express.Application;
  private accountRouter: AccountRouter;

  constructor() {
    this.server = express();
    this.accountRouter = new AccountRouter();

    this.middlewares();
  }

  private middlewares() {
    this.server.use(cors({ origin: "*" }));
    this.server.use(express.json());
    this.server.use("/", this.accountRouter.run());
    this.server.use(errorMiddleware);
  }

  getServer() {
    return this.server;
  }
}

const app = new App();

const server = app.getServer();

export { server };
