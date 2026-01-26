import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/db';
import bookingRoutes from './routes/bookingRoutes';

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/bookings', bookingRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Booking Service is running' });
});

const PORT = process.env.PORT || 3004;

app.listen(PORT, () => {
  console.log(`Booking Service running on port ${PORT}`);
});
