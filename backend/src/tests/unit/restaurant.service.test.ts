import { RestaurantService } from '../../services/restaurant.service';
import { prismaMock } from '../singleton';
import { createMockRestaurant } from '../factories/restaurant.factory';
import {
  RestaurantNotFoundError,
  RestaurantValidationError,
} from '../../errors/restaurant.error';
import { Cuisine, Speed } from '@prisma/client';

const service = new RestaurantService();

// ============================================================
describe('getRestaurants', () => {
  it('should return restaurants with correct pagination', async () => {
    const mockList = [
      createMockRestaurant({ id: 1, name: '大家樂' }),
      createMockRestaurant({ id: 2, name: '麥當勞' }),
    ];
    prismaMock.restaurant.findMany.mockResolvedValue(
      mockList
    );
    prismaMock.restaurant.count.mockResolvedValue(10);

    const result = await service.getRestaurants({
      page: 1,
      limit: 2,
      sortColumn: 'id',
      sortDirection: 'desc',
    });

    expect(result.restaurants).toHaveLength(2);
    expect(result.pagination).toEqual({
      page: 1,
      limit: 2,
      total: 10,
      pages: 5,
      hasNext: true,
    });
  });

  it('should calculate skip correctly for page 2', async () => {
    prismaMock.restaurant.findMany.mockResolvedValue([]);
    prismaMock.restaurant.count.mockResolvedValue(10);

    await service.getRestaurants({
      page: 2,
      limit: 5,
      sortColumn: 'id',
      sortDirection: 'desc',
    });

    expect(
      prismaMock.restaurant.findMany
    ).toHaveBeenCalledWith({
      orderBy: {
        id: 'desc',
      },
      skip: 5,
      take: 5,
    });
  });

  it('should return hasNext false when on last page', async () => {
    const mockList = [createMockRestaurant()];
    prismaMock.restaurant.findMany.mockResolvedValue(
      mockList
    );
    prismaMock.restaurant.count.mockResolvedValue(1);

    const result = await service.getRestaurants({
      page: 1,
      limit: 5,
      sortColumn: 'id',
      sortDirection: 'desc',
    });

    expect(result.pagination.hasNext).toBe(false);
  });
  it('should return empty array if no data in database', async () => {
    prismaMock.restaurant.findMany.mockResolvedValue([]);
    prismaMock.restaurant.count.mockResolvedValue(0);

    const result = await service.getRestaurants({
      page: 1,
      limit: 2,
      sortColumn: 'id',
      sortDirection: 'desc',
    });

    expect(result.restaurants).toHaveLength(0);
    expect(result.pagination).toEqual({
      page: 1,
      limit: 2,
      total: 0,
      pages: 0,
      hasNext: false,
    });
  });
});

// ============================================================
describe('createRestaurant', () => {
  it('should create and return new restaurant', async () => {
    const body = {
      name: '翠華',
      avgPrice: 80,
      speed: Speed.fast,
      cuisine: Cuisine.chinese,
      takeaway: false,
      dineIn: true,
      active: true,
    };
    const mockData = createMockRestaurant(body);
    prismaMock.restaurant.create.mockResolvedValue(
      mockData
    );

    const result = await service.createRestaurant(body);

    expect(result).toEqual(mockData);
    expect(
      prismaMock.restaurant.create
    ).toHaveBeenCalledWith({ data: body });
  });
});

// ============================================================
describe('updateRestaurant', () => {
  it('should update and return updated restaurant', async () => {
    const existing = createMockRestaurant({ id: 1 });
    const updated = createMockRestaurant({
      id: 1,
      name: '新翠華',
    });
    prismaMock.restaurant.findUniqueOrThrow.mockResolvedValue(
      existing
    );
    prismaMock.restaurant.update.mockResolvedValue(updated);

    const result = await service.updateRestaurant(1, {
      name: '新翠華',
    });

    expect(result).toEqual(updated);
  });

  it('should throw RestaurantValidationError when body is empty', async () => {
    await expect(
      service.updateRestaurant(1, {})
    ).rejects.toThrow(RestaurantValidationError);
  });

  it('should throw RestaurantNotFoundError when id does not exist', async () => {
    prismaMock.restaurant.findUniqueOrThrow.mockRejectedValue(
      new Error('Not found')
    );

    await expect(
      service.updateRestaurant(999, { name: 'test' })
    ).rejects.toThrow(RestaurantNotFoundError);
  });
});

// ============================================================
describe('recommendRestaurant', () => {
  it('should return one restaurant matching filters', async () => {
    const restaurant = createMockRestaurant({
      active: true,
    });
    prismaMock.restaurant.count.mockResolvedValue(3);
    prismaMock.restaurant.findMany.mockResolvedValue([
      restaurant,
    ]);

    const result = await service.recommendRestaurant({
      budget: 100,
      speed: Speed.fast,
      cuisine: Cuisine.chinese,
    });

    expect(result).toEqual(restaurant);
  });

  it('should return empty object when no restaurant matches', async () => {
    prismaMock.restaurant.count.mockResolvedValue(0);

    await expect(
      service.recommendRestaurant({
        budget: 1,
        speed: Speed.fast,
        cuisine: Cuisine.chinese,
      })
    ).resolves.toEqual({});
  });

  it('should build where clause correctly with all filters', async () => {
    prismaMock.restaurant.count.mockResolvedValue(1);
    prismaMock.restaurant.findMany.mockResolvedValue([
      createMockRestaurant(),
    ]);

    await service.recommendRestaurant({
      budget: 150,
      speed: Speed.fast,
      cuisine: Cuisine.japanese,
    });

    expect(
      prismaMock.restaurant.count
    ).toHaveBeenCalledWith({
      where: {
        active: true,
        avgPrice: { lte: 150 },
        speed: Speed.fast,
        cuisine: Cuisine.japanese,
      },
    });
  });
});
