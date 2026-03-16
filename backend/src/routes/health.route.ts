import { Router, Request, Response } from 'express';
import { checkDatabaseConnection } from '../utils/db';

const router = Router();

// App health
router.get('/health', (req: Request, res: Response) =>
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
  })
);

// DB health
router.get(
  '/db-health',
  async (req: Request, res: Response) => {
    const ok = await checkDatabaseConnection();
    if (!ok) {
      return res.status(500).json({
        status: 'ERROR',
        message: 'Database not reachable',
      });
    }
    return res.json({ status: 'OK' });
  }
);

export default router;
