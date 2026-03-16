import { BaseError } from './base';

export class RestaurantNotFoundError extends BaseError {
  constructor() {
    super({
      code: 200001,
      message: 'Restaurant not found',
      httpStatus: 404,
    });
  }
}

export class RestaurantValidationError extends BaseError {
  constructor(message: string) {
    super({ code: 200002, message, httpStatus: 400 });
  }
}
