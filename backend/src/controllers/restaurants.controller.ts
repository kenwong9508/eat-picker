import { Request, Response } from 'express';
import { RestaurantService } from '../services/restaurant.service';
import {
  CreateRestaurantBody,
  GetRestaurantsQuery,
  schemas,
  UpdateRestaurantBody,
  UpdateRestaurantParams,
} from '../validators/restaurants';
import { BaseController } from './base.controller';

export class RestaurantsController extends BaseController {
  private service: RestaurantService;

  constructor() {
    super();
    this.service = new RestaurantService();
  }

  // ✅ GET /api/restaurants
  getRestaurants = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const params =
        req.validatedQuery as GetRestaurantsQuery;
      const data =
        await this.service.getRestaurants(params);
      this.sendSuccess(res, data);
    } catch (error) {
      this.sendError(res, error);
    }
  };

  // ✅ POST /api/restaurants
  createRestaurant = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const body =
        req.validatedBody as CreateRestaurantBody;
      const data =
        await this.service.createRestaurant(body);
      this.sendSuccess(res, data);
    } catch (error) {
      this.sendError(res, error);
    }
  };

  // ✅ PATCH /api/restaurants/:id
  updateRestaurant = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } =
      req.validatedParams as UpdateRestaurantParams;
    const body = req.validatedBody as UpdateRestaurantBody;

    try {
      const updated = await this.service.updateRestaurant(
        parseInt(id),
        body
      );
      this.sendSuccess(res, updated);
    } catch (error: any) {
      this.sendError(res, error);
    }
  };
}
