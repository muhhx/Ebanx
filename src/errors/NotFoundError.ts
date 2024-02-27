import { ApplicationError } from "./ApplicationError";

class NotFoundError extends ApplicationError {
  internalCode = "NOT_FOUND_ERROR";
  code = 404;
  responseMessage: string | number;

  constructor(message?: string | number) {
    super();

    this.responseMessage = message || 0;

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serialize() {
    return this.responseMessage;
  }
}

export { NotFoundError };
