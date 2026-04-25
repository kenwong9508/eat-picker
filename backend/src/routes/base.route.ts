import { Router } from 'express';

export abstract class BaseRoute {
  protected router = Router();
  protected abstract initRoutes(): void;

  getRouter() {
    return this.router;
  }
}
