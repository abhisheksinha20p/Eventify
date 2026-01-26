import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { connectDB } from './config/db';
import paymentRoutes from './routes/paymentRoutes';

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(helmet());

// Webhook requires raw body, others json.
// We handled this in routes? No, global middleware runs first.
// Solution: Use JSON parser except for webhook, or route specific.
// Simple way: check url.
app.use((req, res, next) => {
  if (req.originalUrl === '/payments/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});

app.use('/payments', paymentRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Payment Service is running' });
});

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`Payment Service running on port ${PORT}`);
});
