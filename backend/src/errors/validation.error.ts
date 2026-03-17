import { BaseError } from './base';

export class ValidationError extends BaseError {
  constructor(message: string) {
    super({
      code: 'VAL-001',
      message,
      httpStatus: 400,
    });
  }
}
