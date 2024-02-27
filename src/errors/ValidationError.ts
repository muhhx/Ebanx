import { ApplicationError } from "./ApplicationError";

class ValidationError extends ApplicationError {
  internalCode = "VALIDATION_ERROR";
  code = 400;
  responseMessage: string | number;

  constructor(message?: string | number) {
    super();

    this.responseMessage =
      message || "Invalid request. Verify your request body.";

    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  serialize() {
    return this.responseMessage;
  }
}

export { ValidationError };
