import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/users', userRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'User Service is running' });
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});
