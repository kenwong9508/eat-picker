import express, { Application } from 'express';
import { RestaurantsController } from '../../controllers/restaurants.controller';
import { RestaurantService } from '../../services/restaurant.service';
import { Router } from 'express';
import { validate } from '../../middleware/validate';
import { schemas } from '../../validators/restaurants';

export function setupControllerTest(): {
  app: Application;
  service: jest.Mocked<RestaurantService>;
} {
  const service = {
    getRestaurants: jest.fn(),
    createRestaurant: jest.fn(),
    updateRestaurant: jest.fn(),
    recommendRestaurant: jest.fn(),
  } as unknown as jest.Mocked<RestaurantService>;

  const controller = new RestaurantsController(service);

  const router = Router();
  router.get(
    '/restaurants',
    validate.query(schemas.getRestaurantsQuery),
    controller.getRestaurants
  );
  router.post(
    '/restaurants',
    validate.body(schemas.createRestaurantBody),
    controller.createRestaurant
  );
  router.patch(
    '/restaurants/:id',
    validate.params(schemas.updateRestaurantParams),
    validate.body(schemas.updateRestaurantBody),
    controller.updateRestaurant
  );
  router.get(
    '/restaurants/recommend',
    validate.query(schemas.recommendQuery),
    controller.recommendRestaurant
  );

  const app = express();
  app.use(express.json());
  app.use('/api', router);

  return { app, service };
}

export function toJsonBody<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}
