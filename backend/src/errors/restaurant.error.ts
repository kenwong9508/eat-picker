import { BaseError } from './base';

export class RestaurantValidationError extends BaseError {
  constructor(message: string) {
    super({
      code: 'RES-VAL-001',
      message,
      httpStatus: 400,
    });
  }
}

export class RestaurantNotFoundError extends BaseError {
  constructor() {
    super({
      code: 'RES-NOT-001',
      message: 'Restaurant not found',
      httpStatus: 404,
    });
  }
}
