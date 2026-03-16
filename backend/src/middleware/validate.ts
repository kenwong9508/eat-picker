import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

const validateField = (
  reqKey: string,
  validatedKey: string,
  schema: ZodSchema
) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const input = req[reqKey as keyof Request] ?? {};
      (req as any)[validatedKey] = schema.parse(input);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          errors: error.issues.map((issue) => ({
            path: issue.path,
            message: issue.message,
          })),
        });
      }
      return res
        .status(500)
        .json({ error: 'Validation failed' });
    }
  };
};

export const validate = {
  query: (schema: ZodSchema) =>
    validateField('query', 'validatedQuery', schema),
  params: (schema: ZodSchema) =>
    validateField('params', 'validatedParams', schema),
  body: (schema: ZodSchema) =>
    validateField('body', 'validatedBody', schema),
} as const;
