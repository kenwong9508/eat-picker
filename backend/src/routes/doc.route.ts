import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const router = Router();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'eat-picker API',
      version: '1.0.0',
      description:
        'Restaurant recommendation backend with Express + Prisma',
    },
    tags: [
      {
        name: 'Restaurants',
        description: 'Restaurant related endpoints',
      },
    ],
    servers: [
      { url: 'http://localhost:3000' }, // dev
      // { url: 'https://your-domain.com' }, // prod
    ],
  },
  apis: ['./src/swagger/*.swagger.ts'],
};

const specs = swaggerJsdoc(options);

router.use(
  '/swagger-ui',
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    swaggerOptions: {
      persistAuthorization: true, // remember auth token
    },
  })
);

router.get('/swagger-file', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json(specs);
});

export default router;
