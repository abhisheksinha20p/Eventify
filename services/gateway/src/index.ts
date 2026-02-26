import express, { Express, Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
// Note: We don't use express.json() globally here because http-proxy-middleware 
// works better with raw streams for proxying requests.

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', service: 'gateway', timestamp: new Date() });
});

// Proxy Services Configuration
const services = {
  auth: process.env.AUTH_SERVICE_URL || 'http://auth-service:3001',
  users: process.env.USER_SERVICE_URL || 'http://user-service:3002',
  events: process.env.EVENT_SERVICE_URL || 'http://event-service:3003',
  bookings: process.env.BOOKING_SERVICE_URL || 'http://booking-service:3004',
  payments: process.env.PAYMENT_SERVICE_URL || 'http://payment-service:3005',
  approvals: process.env.APPROVAL_SERVICE_URL || 'http://approval-service:3006',
  qr: process.env.QR_SERVICE_URL || 'http://qr-service:3007',
  notifications: process.env.NOTIFICATION_SERVICE_URL || 'http://notification-service:3008',
};

// Setup Proxies
app.use('/auth', createProxyMiddleware({ target: services.auth, changeOrigin: true }));
app.use('/users', createProxyMiddleware({ target: services.users, changeOrigin: true }));
app.use('/events', createProxyMiddleware({ target: services.events, changeOrigin: true }));
app.use('/bookings', createProxyMiddleware({ target: services.bookings, changeOrigin: true }));
app.use('/payments', createProxyMiddleware({ target: services.payments, changeOrigin: true }));
app.use('/approvals', createProxyMiddleware({ target: services.approvals, changeOrigin: true }));
app.use('/qr', createProxyMiddleware({ target: services.qr, changeOrigin: true }));
app.use('/notifications', createProxyMiddleware({ target: services.notifications, changeOrigin: true }));

// Start Gateway
app.listen(PORT, () => {
  console.log(`[Gateway] Server running on port ${PORT}`);
});
