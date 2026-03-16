export class BaseError extends Error {
  public readonly code: number;
  public readonly httpStatus: number;

  constructor({
    code,
    message,
    httpStatus,
  }: {
    code: number;
    message: string;
    httpStatus: number;
  }) {
    super(message);
    this.code = code;
    this.httpStatus = httpStatus;
  }
}
