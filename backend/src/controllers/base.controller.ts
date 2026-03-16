import { Response } from 'express';
import logger from '$logger';

export abstract class BaseController {
  protected sendSuccess(
    res: Response,
    data: any,
    status = 200
  ) {
    res.status(status).json({ success: true, data });
  }

  protected sendError(
    res: Response,
    error: any,
    status = 500
  ) {
    logger.error('Controller error:', error);
    res
      .status(status)
      .json({ success: false, error: error.message });
  }
}
