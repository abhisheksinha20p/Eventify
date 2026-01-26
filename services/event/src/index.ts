import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/db';
import eventRoutes from './routes/eventRoutes';

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/', eventRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Event Service is running' });
});

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Event Service running on port ${PORT}`);
});
