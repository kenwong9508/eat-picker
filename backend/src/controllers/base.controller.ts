import { Response } from 'express';
import logger from '$logger';

export abstract class BaseController {
  protected sendSuccess(
    res: Response,
    data: any,
    status = 200
  ) {
    res.status(status).json({ results: data });
  }

  protected sendError(
    res: Response,
    error: any,
    status = 500
  ) {
    logger.error('Controller error:', error);
    res.status(error?.httpStatus).json({
      error: {
        code: error?.code,
        message: error?.message,
      },
    });
  }
}
