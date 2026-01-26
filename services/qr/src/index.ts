import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/db';
import { connectRedis } from './config/redis';
import qrRoutes from './routes/qrRoutes';

dotenv.config();

connectDB();
connectRedis();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/', qrRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'QR Service is running' });
});

const PORT = process.env.PORT || 3007;

app.listen(PORT, () => {
  console.log(`QR Service running on port ${PORT}`);
});
