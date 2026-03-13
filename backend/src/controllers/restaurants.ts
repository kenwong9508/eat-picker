import { Request, Response } from 'express';
import { RestaurantService } from '../services/restaurantService';
import {
  getRestaurantsSchema,
  createRestaurantSchema,
  updateRestaurantSchema,
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

export const updateRestaurant = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res
      .status(400)
      .json({ error: 'Invalid restaurant ID' });
    return;
  }

  const data = req.validatedBody as z.infer<
    typeof updateRestaurantSchema
  >;

  try {
    const updated =
      await RestaurantService.updateRestaurant(id, data);
    res.status(200).json({
      message: 'Restaurant updated successfully',
      data: updated,
    });
  } catch (error: any) {
    if (error.message === 'No fields to update') {
      res.status(400).json({ error: error.message });
    } else if (error.code === 'P2025') {
      res
        .status(404)
        .json({ error: 'Restaurant not found' });
    } else {
      console.error(error);
      res
        .status(500)
        .json({ error: 'Failed to update restaurant' });
    }
  }
};
