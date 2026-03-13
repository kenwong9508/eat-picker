import { Router } from 'express';
import { validateQuery } from '../middleware/validate';
import { getRestaurantsSchema } from '../validators/restaurants';
import { getRestaurants } from '../controllers/restaurants';

const router = Router();

router.get(
  '/',
  validateQuery(getRestaurantsSchema),
  getRestaurants
);

export default router;
