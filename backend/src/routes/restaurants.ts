import { Router } from 'express';
import {
  validateQuery,
  validateBody,
} from '../middleware/validate';
import {
  getRestaurantsSchema,
  createRestaurantSchema,
} from '../validators/restaurants';
import {
  getRestaurants,
  createRestaurant,
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

export default router;
