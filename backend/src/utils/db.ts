import logger from '$logger';
import { prisma } from '$config/db';

export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    logger.error('Database connection check failed', {
      error,
    });
    return false;
  }
}
