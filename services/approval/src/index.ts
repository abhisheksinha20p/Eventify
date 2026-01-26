import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/db';
import approvalRoutes from './routes/approvalRoutes';

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/', approvalRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Approval Service is running' });
});

const PORT = process.env.PORT || 3006;

app.listen(PORT, () => {
  console.log(`Approval Service running on port ${PORT}`);
});
