import { prisma } from '$config/db';
import { z } from 'zod';
import { getRestaurantsSchema } from '../validators/restaurants';

type GetRestaurantsParams = z.infer<
  typeof getRestaurantsSchema
>;

export class RestaurantService {
  static async getRestaurants(
    params: GetRestaurantsParams
  ) {
    const { page, limit } = params;
    const skip = (page - 1) * limit;

    const [restaurants, total] = await Promise.all([
      prisma.restaurant.findMany({
        skip,
        take: limit,
        // orderBy: { createdAt: 'desc' },
      }),
      prisma.restaurant.count(),
    ]);

    return {
      data: restaurants,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: page * limit < total,
      },
    };
  }
}
