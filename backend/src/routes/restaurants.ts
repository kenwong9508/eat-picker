import { Router } from 'express';
import {
  validateQuery,
  validateBody,
} from '../middleware/validate';
import {
  getRestaurantsSchema,
  createRestaurantSchema,
  updateRestaurantSchema,
} from '../validators/restaurants';
import {
  getRestaurants,
  createRestaurant,
  updateRestaurant,
} from '../controllers/restaurants';

const router = Router();

router.get(
  '/',
  validateQuery(getRestaurantsSchema),
  getRestaurants
);

router.post(
  '/',
  validateBody(createRestaurantSchema),
  createRestaurant
);

router.patch(
  '/:id',
  validateBody(updateRestaurantSchema),
  updateRestaurant
);

export default router;
