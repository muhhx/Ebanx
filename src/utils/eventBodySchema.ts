import { z } from "zod";

const eventBodySchema = z
  .object({
    type: z.enum(["deposit", "withdraw", "transfer"], {
      required_error: "type is required.",
    }),
    destination: z
      .string({
        invalid_type_error: "destination must be a string. ",
      })
      .optional(),
    origin: z
      .string({
        invalid_type_error: "origin must be a string. ",
      })
      .optional(),
    amount: z
      .number({
        invalid_type_error: "amount must be a number.",
        required_error: "amount is required.",
      })
      .nonnegative({ message: "amount must be a positive number." }),
  })
  .superRefine((data, ctx) => {
    if (data.type === "deposit" && !data.destination) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "destination is required for deposit event.",
        path: ["destination"],
        fatal: true,
      });

      return z.NEVER;
    }

    if (data.type === "withdraw" && !data.origin) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "origin is required for withdraw event.",
        path: ["origin"],
        fatal: true,
      });

      return z.NEVER;
    }

    if (data.type === "transfer" && (!data.origin || !data.destination)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "origin and destination are required for transfer event.",
        path: ["origin", "destination"],
        fatal: true,
      });

      return z.NEVER;
    }
  });

export { eventBodySchema };
