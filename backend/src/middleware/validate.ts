import { ValidationError } from '../errors/validation.error';
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
      let errorMessage: string;

      if (error instanceof ZodError) {
        errorMessage = error.issues
          .map(
            (issue) =>
              `${issue.path.join('.')}: ${issue.message}`
          )
          .join('; ');
      } else {
        errorMessage = 'Middleware Validation failed';
      }

      const valError = new ValidationError(errorMessage);

      return res.status(valError.httpStatus).json({
        error: {
          code: valError.code,
          message: valError.message,
        },
      });
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
