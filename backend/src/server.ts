import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import logger from '$logger';
import healthRoutes from './routes/health.route';
import docsRoutes from './routes/doc.route';
import restaurantRoutes from './routes/restaurants.route';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use(
  morgan('combined', {
    stream: { write: (msg) => logger.http(msg.trim()) },
  })
);

// Normal Routes
app.use(healthRoutes);
app.use(docsRoutes);
app.use('/api', restaurantRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'API not found' });
});

// Start
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
