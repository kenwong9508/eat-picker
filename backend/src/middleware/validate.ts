import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const validateQuery = (schema: ZodSchema) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      req.validatedQuery = schema.parse(req.query);
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
      res.status(500).json({ error: 'Validation failed' });
    }
  };
};

export const validateBody = (schema: ZodSchema) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      req.validatedBody = schema.parse(req.body);
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
      res.status(500).json({ error: 'Validation failed' });
    }
  };
};
