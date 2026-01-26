import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 8080,
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key', // TODO: Change in production
  services: {
    auth: process.env.AUTH_SERVICE_URL || 'http://localhost:3001',
    user: process.env.USER_SERVICE_URL || 'http://localhost:3002',
    event: process.env.EVENT_SERVICE_URL || 'http://localhost:3003',
    booking: process.env.BOOKING_SERVICE_URL || 'http://localhost:3004',
    payment: process.env.PAYMENT_SERVICE_URL || 'http://localhost:3005',
    approval: process.env.APPROVAL_SERVICE_URL || 'http://localhost:3006',
    qr: process.env.QR_SERVICE_URL || 'http://localhost:3007',
    notification: process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3008',
  },
};
