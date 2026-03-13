import { prisma } from '$config/db';
import { z } from 'zod';
import {
  createRestaurantSchema,
  getRestaurantsSchema,
  updateRestaurantSchema,
} from '../validators/restaurants';

type GetRestaurantsParams = z.infer<
  typeof getRestaurantsSchema
>;
type CreateRestaurantParams = z.infer<
  typeof createRestaurantSchema
>;
type UpdateRestaurantParams = z.infer<
  typeof updateRestaurantSchema
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
  static async updateRestaurant(
    id: number,
    input: UpdateRestaurantParams
  ) {
    // Validate
    const validated = updateRestaurantSchema.parse(input);

    // 只更新有傳嘅欄位
    const data: any = {};
    if (validated.name !== undefined)
      data.name = validated.name;
    if (validated.avg_price !== undefined)
      data.avg_price = validated.avg_price;
    if (validated.speed !== undefined)
      data.speed = validated.speed;
    if (validated.cuisine !== undefined)
      data.cuisine = validated.cuisine;
    if (validated.takeaway !== undefined)
      data.takeaway = validated.takeaway;
    if (validated.dine_in !== undefined)
      data.dine_in = validated.dine_in;
    if (validated.active !== undefined)
      data.active = validated.active;
    if (validated.address !== undefined)
      data.address = validated.address;

    if (Object.keys(data).length === 0) {
      throw new Error('No fields to update');
    }

    return prisma.restaurant.update({
      where: { id },
      data,
    });
  }
}
