import { Router } from 'express';
import { validate } from '../middleware/validate';
import { schemas } from '../validators/restaurants';
import { RestaurantsController } from '../controllers/restaurants.controller';
import { BaseRoute } from './base.route';

export class RestaurantsRoute extends BaseRoute {
  private controller: RestaurantsController;

  constructor() {
    super();
    this.controller = new RestaurantsController();
    this.initRoutes();
  }

  protected initRoutes(): void {
    // GET /api/restaurants?page=1&limit=10
    this.router.get(
      '/',
      validate.query(schemas.getRestaurantsQuery),
      this.controller.getRestaurants.bind(this.controller)
    );

    // POST /api/restaurants → body
    this.router.post(
      '/',
      validate.body(schemas.createRestaurantBody),
      this.controller.createRestaurant.bind(this.controller)
    );

    // PATCH /api/restaurants/:id → params + body
    this.router.patch(
      '/:id',
      validate.params(schemas.updateRestaurantParams),
      validate.body(schemas.updateRestaurantBody),
      this.controller.updateRestaurant.bind(this.controller)
    );
  }
}

const restaurantsRoute = new RestaurantsRoute();
export default restaurantsRoute.getRouter();
