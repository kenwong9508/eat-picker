import { Restaurant, Speed, Cuisine } from '@prisma/client';

export const createMockRestaurant = (
  overrides?: Partial<Restaurant>
): Restaurant => ({
  id: 1,
  name: '大家樂',
  avgPrice: 50,
  speed: Speed.fast,
  cuisine: Cuisine.chinese,
  takeaway: false,
  dineIn: true,
  active: true,
  address: null,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
  ...overrides,
});
