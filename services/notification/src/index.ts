import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/db';
import notificationRoutes from './routes/notificationRoutes';

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/notifications', notificationRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Notification Service is running' });
});

const PORT = process.env.PORT || 3008;

app.listen(PORT, () => {
  console.log(`Notification Service running on port ${PORT}`);
});
