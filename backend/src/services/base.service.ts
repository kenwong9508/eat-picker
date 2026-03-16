import { prisma } from '$config/db';

export abstract class BaseService {
  protected prisma = prisma; // Singleton inject！
}
