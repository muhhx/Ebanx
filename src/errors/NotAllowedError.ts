import { ApplicationError } from "./ApplicationError";

class NotAllowedError extends ApplicationError {
  internalCode = "NOT_ALLOWED_ERROR";
  code = 400;
  responseMessage: string | number;

  constructor(message?: string | number) {
    super();

    this.responseMessage =
      message || "You are not allowed to make this operation.";

    Object.setPrototypeOf(this, NotAllowedError.prototype);
  }

  serialize() {
    return this.responseMessage;
  }
}

export { NotAllowedError };
