import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import bankingRoutes from './routes/banking';
import swapRoutes from './routes/swap';
import userRoutes from './routes/user';
import analyticsRoutes from './routes/analytics';
import yieldRoutes from './routes/yield';
import stakingRoutes from './routes/staking';
import authRoutes from './routes/auth';
import { generalLimiter } from './middleware/rateLimiter';
import { requestLogger } from './middleware/logger';
import { sanitizeInput, sanitizeResponse, secureHeaders } from './middleware/sanitize';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(sanitizeInput);
app.use(sanitizeResponse);
app.use(secureHeaders);
app.use(requestLogger);
app.use('/api/', generalLimiter);

app.get('/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    database: 'MongoDB',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/banking', bankingRoutes);
app.use('/api/swap', swapRoutes);
app.use('/api/user', userRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/yield', yieldRoutes);
app.use('/api/staking', stakingRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDatabase();
    
    app.listen(PORT, () => {
      console.log(`🚀 CrossFlow Backend API running on port ${PORT}`);
      console.log(`📊 Database: MongoDB`);
      console.log(`🌐 Frontend: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
