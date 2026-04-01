import { BaseService } from './base.service';
import {
  CreateRestaurantBody,
  GetRestaurantsQuery,
  RecommendQuery,
  UpdateRestaurantBody,
} from '../validators/restaurants';
import logger from '$logger';
import {
  RestaurantNotFoundError,
  RestaurantValidationError,
} from '../errors/restaurant.error';

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
      restaurants,
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
      data: body,
    });
  }

  async updateRestaurant(
    id: number,
    body: UpdateRestaurantBody
  ) {
    if (Object.keys(body).length === 0) {
      const errorMessage = `restaurant id ${id}: No fields provided for update`;
      logger.warn(errorMessage);
      throw new RestaurantValidationError(errorMessage);
    }

    // check if id exist in database
    try {
      await this.prisma.restaurant.findUniqueOrThrow({
        where: { id },
      });
    } catch (error) {
      const err = new RestaurantNotFoundError();
      logger.warn(error);
      throw err;
    }

    return await this.prisma.restaurant.update({
      where: { id },
      data: body,
    });
  }

  async recommendRestaurant(params: RecommendQuery) {
    const where: any = { active: true };

    if (params.budget) {
      where.avgPrice = { lte: params.budget };
    }
    if (params.speed) {
      where.speed = params.speed;
    }
    if (params.cuisine) {
      where.cuisine = params.cuisine;
    }

    const count = await this.prisma.restaurant.count({
      where,
    });
    if (count === 0) {
      const error = new RestaurantNotFoundError();
      const errorMessage = error?.message;
      logger.warn(errorMessage);
      throw error;
    }

    // Random choose ONE restaurant
    const skip = Math.floor(Math.random() * count);
    const [restaurant] =
      await this.prisma.restaurant.findMany({
        where,
        skip,
        take: 1,
      });

    return restaurant;
  }
}
