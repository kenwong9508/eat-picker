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
