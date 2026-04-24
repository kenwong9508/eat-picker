import express, { Application } from 'express';
import cors, { CorsOptions } from 'cors';
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

// 1. 從 .env 讀可用 origins，逗號分隔
//    例如：CORS_ORIGINS=http://localhost:5173,https://eat-picker.com
const corsOriginsEnv = process.env.CORS_ORIGINS || '';
const whitelist = corsOriginsEnv
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

// 2. CORS options：用 whitelist 做檢查
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // 無 origin（例如 Postman / curl）都照俾過，方便測試
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  credentials: true,
};

// Middleware
app.use(helmet());
app.use(cors(corsOptions));
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
