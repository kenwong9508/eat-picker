import { z } from 'zod';

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
const CuisineEnum = z.enum(CuisineValues);

export const schemas = {
  getRestaurantsQuery: z.object({
    page: z.coerce
      .number()
      .min(1, 'Page must be >= 1')
      .default(1),
    limit: z.coerce
      .number()
      .min(1)
      .max(50, 'Limit must be <= 50')
      .default(10),
  }),
  createRestaurantBody: z.object({
    name: z.string().min(1).max(256),
    avgPrice: z.coerce.number().min(1),
    speed: SpeedEnum,
    cuisine: CuisineEnum,
    takeaway: z.boolean().default(false),
    dineIn: z.boolean().default(true),
    active: z.boolean().default(true),
    address: z.string().optional(),
  }),
  updateRestaurantParams: z.object({
    id: z
      .string()
      .regex(/^\d+$/, 'ID must be positive integer'),
  }),
  updateRestaurantBody: z.object({
    name: z.string().min(1).max(256).optional(),
    avgPrice: z.coerce.number().min(1).optional(),
    speed: SpeedEnum.optional(),
    cuisine: CuisineEnum.optional(),
    takeaway: z.boolean().optional(),
    dineIn: z.boolean().optional(),
    active: z.boolean().optional(),
    address: z.string().optional(),
  }),
  recommendQuery: z.object({
    budget: z.coerce.number().min(1),
    speed: SpeedEnum,
    cuisine: CuisineEnum,
  }),
};

export type GetRestaurantsQuery = z.infer<
  typeof schemas.getRestaurantsQuery
>;

export type CreateRestaurantBody = z.infer<
  typeof schemas.createRestaurantBody
>;

export type UpdateRestaurantParams = z.infer<
  typeof schemas.updateRestaurantParams
>;
export type UpdateRestaurantBody = z.infer<
  typeof schemas.updateRestaurantBody
>;

export type RecommendQuery = z.infer<
  typeof schemas.recommendQuery
>;
