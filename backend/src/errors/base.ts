export class BaseError extends Error {
  public readonly code: string;
  public readonly httpStatus: number;

  constructor({
    code,
    message,
    httpStatus,
  }: {
    code: string;
    message: string;
    httpStatus: number;
  }) {
    super(message);
    this.code = code;
    this.httpStatus = httpStatus;
  }
}
