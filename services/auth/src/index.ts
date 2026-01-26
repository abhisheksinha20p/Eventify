import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/auth', authRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Auth Service is running' });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});
