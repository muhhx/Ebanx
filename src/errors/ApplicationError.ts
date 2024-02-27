import { ErrorResponse } from "../types";
abstract class ApplicationError extends Error {
  abstract internalCode: string;
  abstract code: number;
  abstract responseMessage: string | number;

  constructor() {
    super();

    Object.setPrototypeOf(this, ApplicationError.prototype);
  }

  abstract serialize(): ErrorResponse;
}

export { ApplicationError };
