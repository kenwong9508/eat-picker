import { z } from 'zod';

export const getRestaurantsSchema = z.object({
  page: z.coerce
    .number()
    .min(1, 'Page must be >= 1')
    .default(1),
  limit: z.coerce
    .number()
    .min(1)
    .max(50, 'Limit must be <= 50')
    .default(10),
});

const SpeedValues = ['fast', 'normal', 'slow'] as const;
const SpeedEnum = z.enum(SpeedValues);

const CuisineValues = [
  'chinese',
  'congee',
  'noodle',
  'hotpot',
  'japanese',
  'korean',
  'western',
  'fastfood',
  'thai',
] as const;
export const CuisineEnum = z.enum(CuisineValues);

export const createRestaurantSchema = z.object({
  name: z.string().min(1).max(256),
  avg_price: z.coerce.number().min(1),
  speed: SpeedEnum,
  cuisine: CuisineEnum,
  takeaway: z.boolean().default(false),
  dine_in: z.boolean().default(true),
  active: z.boolean().default(true),
  address: z.string().optional(),
});

export const updateRestaurantSchema = z.object({
  name: z.string().min(1).max(256).optional(),
  avg_price: z.coerce.number().min(1).optional(),
  speed: SpeedEnum.optional(),
  cuisine: CuisineEnum.optional(),
  takeaway: z.boolean().optional(),
  dine_in: z.boolean().optional(),
  active: z.boolean().optional(),
  address: z.string().optional(),
});
