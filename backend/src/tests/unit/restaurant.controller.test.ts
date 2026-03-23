import request from 'supertest';
import { Application } from 'express';
import { RestaurantService } from '../../services/restaurant.service';
import {
  setupControllerTest,
  toJsonBody,
} from '../helpers/testUtils';
import { createMockRestaurant } from '../factories/restaurant.factory';
import { Cuisine, Speed } from '@prisma/client';
import { RestaurantNotFoundError } from '../../errors/restaurant.error';

describe('RestaurantsController', () => {
  let app: Application;
  let service: jest.Mocked<RestaurantService>;

  beforeEach(() => {
    ({ app, service } = setupControllerTest());
  });

  describe('RestaurantsController', () => {
    describe('getRestaurants', () => {
      it('should return all restaurants', async () => {
        // 1. perpare mock data
        const data = {
          restaurants: [
            createMockRestaurant({ id: 1 }),
            createMockRestaurant({ id: 2 }),
          ],
          pagination: {
            page: 1,
            limit: 2,
            total: 2,
            pages: 1,
            hasNext: false,
          },
        };

        // 2. Mock service method
        jest
          .spyOn(service, 'getRestaurants')
          .mockResolvedValue(data);

        // 3. request + assert
        await request(app)
          .get('/api/restaurants?page=1&limit=10')
          .expect(200)
          .then((res) => {
            expect(res.body).toEqual({
              data: toJsonBody(data),
            });
          });
      });
      it('should return 404 when getRestaurants got error', async () => {
        const error = new RestaurantNotFoundError();
        jest
          .spyOn(service, 'getRestaurants')
          .mockRejectedValue(error);

        await request(app)
          .get('/api/restaurants?page=1&limit=10')
          .expect(404)
          .then((res) => {
            expect(res.body).toEqual({
              error: {
                code: error?.code,
                message: error?.message,
              },
            });
          });
      }); // error path
    });

    describe('createRestaurant', () => {
      it('should create and return restaurant', async () => {
        // 1. perpare mock data
        const data = createMockRestaurant();
        // 2. Mock service method
        jest
          .spyOn(service, 'createRestaurant')
          .mockResolvedValue(data);

        // 3. request + assert
        await request(app)
          .post('/api/restaurants')
          .send({
            name: '翠華餐廳',
            avgPrice: 80,
            speed: Speed.fast,
            cuisine: Cuisine.chinese,
          })
          .expect(200)
          .then((res) => {
            expect(res.body).toEqual({
              data: toJsonBody(data),
            });
          });
      }); // happy path
      it('should return 404 when createRestaurant got error', async () => {
        const error = new RestaurantNotFoundError();
        jest
          .spyOn(service, 'createRestaurant')
          .mockRejectedValue(error);

        await request(app)
          .post('/api/restaurants')
          .send({
            name: '翠華餐廳',
            avgPrice: 80,
            speed: Speed.fast,
            cuisine: Cuisine.chinese,
          })
          .expect(404)
          .then((res) => {
            expect(res.body).toEqual({
              error: {
                code: error?.code,
                message: error?.message,
              },
            });
          });
      }); // error path
    });

    describe('updateRestaurant', () => {
      it('should update and return restaurant', async () => {
        const data = createMockRestaurant({
          id: 1,
          speed: Speed.slow,
        });
        jest
          .spyOn(service, 'updateRestaurant')
          .mockResolvedValue(data);

        await request(app)
          .patch(`/api/restaurants/${data.id}`)
          .send({
            speed: Speed.slow,
          })
          .expect(200)
          .then((res) => {
            const speed = res.body?.data?.speed;
            expect(speed).toEqual(Speed.slow);
          });
      }); // happy path
      it('should return 404 when id not found', async () => {
        const error = new RestaurantNotFoundError();
        jest
          .spyOn(service, 'updateRestaurant')
          .mockRejectedValue(error);

        await request(app)
          .patch(`/api/restaurants/999`)
          .send({ speed: Speed.slow })
          .expect(404)
          .then((res) => {
            expect(res.body).toEqual({
              error: {
                code: error?.code,
                message: error?.message,
              },
            });
          });
      }); // error path
    });

    describe('recommendRestaurant', () => {
      it('should return recommended restaurant', async () => {
        const data = createMockRestaurant({
          avgPrice: 100,
          speed: Speed.fast,
          cuisine: Cuisine.hotpot,
        });

        jest
          .spyOn(service, 'recommendRestaurant')
          .mockResolvedValue(data);

        const queryString = `?budget=100&speed=fast&cuisine=hotpot`;
        await request(app)
          .get(`/api/restaurants/recommend${queryString}`)
          .expect(200)
          .then((res) => {
            expect(res.body).toEqual({
              data: toJsonBody(data),
            });
          });
      });
      it('should return 404 when none found', async () => {
        const error = new RestaurantNotFoundError();
        jest
          .spyOn(service, 'recommendRestaurant')
          .mockRejectedValue(error);

        const queryString = `?budget=100&speed=fast&cuisine=hotpot`;
        await request(app)
          .get(`/api/restaurants/recommend${queryString}`)
          .expect(404)
          .then((res) => {
            expect(res.body).toEqual({
              error: {
                code: error?.code,
                message: error?.message,
              },
            });
          });
      }); // error path
    });
  });
});
