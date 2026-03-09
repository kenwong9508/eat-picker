import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
// import swaggerDoc from '../../swagger.json'; // adjust path

const router = Router();
router.use(
  '/api-docs',
  swaggerUi.serve,
  //   TODO
  //   swaggerUi.setup(swaggerDoc)
  swaggerUi.setup({})
);

export default router;
