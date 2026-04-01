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
      '/restaurants/',
      validate.query(schemas.getRestaurantsQuery),
      this.controller.getRestaurants.bind(this.controller)
    );

    // POST /api/restaurants
    this.router.post(
      '/restaurants/',
      validate.body(schemas.createRestaurantBody),
      this.controller.createRestaurant.bind(this.controller)
    );

    // PATCH /api/restaurants/:id
    this.router.patch(
      '/restaurants/:id',
      validate.params(schemas.updateRestaurantParams),
      validate.body(schemas.updateRestaurantBody),
      this.controller.updateRestaurant.bind(this.controller)
    );

    // GET /api/restaurants/recommend?budget=100&speed=fast&cuisine=chinese
    this.router.get(
      '/restaurants/recommend',
      validate.query(schemas.recommendQuery),
      this.controller.recommendRestaurant.bind(
        this.controller
      )
    );
  }
}

const restaurantsRoute = new RestaurantsRoute();
export default restaurantsRoute.getRouter();
