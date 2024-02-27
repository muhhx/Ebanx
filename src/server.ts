import express from "express";
import cors from "cors";

class App {
  private server: express.Application;

  constructor() {
    this.server = express();

    this.middlewares();
  }

  private middlewares() {
    this.server.use(cors({ origin: "*" }));
    this.server.use(express.json());
  }

  getServer() {
    return this.server;
  }
}

const app = new App();

const server = app.getServer();

export { server };
