import { prisma } from '$config/db';
import { z } from 'zod';
import {
  createRestaurantSchema,
  getRestaurantsSchema,
} from '../validators/restaurants';

type GetRestaurantsParams = z.infer<
  typeof getRestaurantsSchema
>;
type CreateRestaurantParams = z.infer<
  typeof createRestaurantSchema
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
  static async createRestaurant(
    params: CreateRestaurantParams
  ) {
    const data = createRestaurantSchema.parse(params);

    const restaurant = await prisma.restaurant.create({
      data: {
        name: data.name,
        avgPrice: data.avg_price,
        speed: data.speed,
        cuisine: data.cuisine,
        takeaway: data.takeaway ?? false,
        dineIn: data.dine_in ?? true,
        active: data.active ?? true,
        address: data.address,
      },
    });

    return restaurant;
  }
}
