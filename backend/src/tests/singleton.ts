import { PrismaClient } from '@prisma/client';
import {
  mockDeep,
  DeepMockProxy,
} from 'jest-mock-extended';

jest.mock('$config/db', () => ({
  __esModule: true,
  prisma: mockDeep<PrismaClient>(),
}));

import { prisma } from '$config/db';

export const prismaMock =
  prisma as unknown as DeepMockProxy<PrismaClient>;
