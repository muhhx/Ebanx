import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodEffects } from "zod";

const validationMiddleware =
  (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);

      return next();
    } catch (err) {
      return next(err);
    }
  };

export { validationMiddleware as validateBody };
