import { Request, Response } from 'express';
import { RestaurantService } from '../services/restaurantService';
import { getRestaurantsSchema } from '../validators/restaurants';
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
