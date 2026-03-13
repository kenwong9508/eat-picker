import { Request, Response } from 'express';
import { RestaurantService } from '../services/restaurantService';
import {
  getRestaurantsSchema,
  createRestaurantSchema,
} from '../validators/restaurants';
import { z } from 'zod';
import logger from '$logger';

export const getRestaurants = async (
  req: Request,
  res: Response
) => {
  try {
    const params = req.validatedQuery as z.infer<
      typeof getRestaurantsSchema
    >;
    const result =
      await RestaurantService.getRestaurants(params);
    res.json(result);
  } catch (error) {
    logger.error('Get restaurants error:', error);
    res
      .status(500)
      .json({ error: 'Internal server error' });
  }
};

export const createRestaurant = async (
  req: Request,
  res: Response
) => {
  try {
    const data = req.validatedBody as z.infer<
      typeof createRestaurantSchema
    >;
    const restaurant =
      await RestaurantService.createRestaurant(data);
    res.status(201).json(restaurant);
  } catch (error) {
    console.error('Create restaurant error:', error);
    res
      .status(500)
      .json({ error: 'Failed to create restaurant' });
  }
};
