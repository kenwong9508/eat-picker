import { z } from 'zod';
import { BaseService } from './base.service';
import {
  CreateRestaurantBody,
  GetRestaurantsQuery,
  UpdateRestaurantBody,
} from '../validators/restaurants';
import logger from '$logger';
import { RestaurantValidationError } from 'errors/restaurant.error';

export class RestaurantService extends BaseService {
  async getRestaurants(params: GetRestaurantsQuery) {
    const { page, limit } = params;
    const skip = (page - 1) * limit;

    const [restaurants, total] = await Promise.all([
      this.prisma.restaurant.findMany({
        skip,
        take: limit,
      }),
      this.prisma.restaurant.count(),
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

  async createRestaurant(body: CreateRestaurantBody) {
    return await this.prisma.restaurant.create({
      data: {
        name: body.name,
        avgPrice: body.avg_price,
        speed: body.speed,
        cuisine: body.cuisine,
        takeaway: body.takeaway,
        dineIn: body.dine_in,
        active: body.active,
        address: body.address,
      },
    });
  }

  async updateRestaurant(
    id: number,
    body: UpdateRestaurantBody
  ) {
    if (Object.keys(body).length === 0) {
      logger.warn(
        `Update restaurant id ${id}: No fields provided for update`
      );
      throw new RestaurantValidationError(
        'No fields provided for update'
      );
    }

    return await this.prisma.restaurant.update({
      where: { id },
      data: body,
    });
  }
}
