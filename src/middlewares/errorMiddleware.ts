import { Request, Response, NextFunction } from "express";

import { ApplicationError } from "../errors/ApplicationError";
import { UncaughtError } from "../errors/UncaughtError";
import { ValidationError } from "../errors/ValidationError";

import { ZodError } from "zod";

function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const error = formatError(err);

  return res.status(error.code).json(error.serialize());
}

function formatError(error: Error) {
  if (error instanceof ApplicationError) {
    return error;
  }

  if (error instanceof ZodError) {
    return new ValidationError();
  }

  return new UncaughtError();
}

export { errorMiddleware };
