import { ApplicationError } from "./ApplicationError";

class UncaughtError extends ApplicationError {
  internalCode = "UNCAUGHT_ERROR";
  code = 500;
  responseMessage: string | number;

  constructor(message?: string | number) {
    super();

    this.responseMessage =
      message || "Some unknown error occurred in our application.";

    Object.setPrototypeOf(this, UncaughtError.prototype);
  }

  serialize() {
    return this.responseMessage;
  }
}

export { UncaughtError };
