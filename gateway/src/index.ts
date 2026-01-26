import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { config } from './config/config';
import { validateToken } from './middleware/auth';

const app = express();

// Security & Logging
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Gateway is running' });
});

// Proxy Routes

// Auth Service (Public routes + Protected if needed)
// Note: Auth service usually has public endpoints like login/register
app.use('/auth', createProxyMiddleware({ 
  target: config.services.auth, 
  changeOrigin: true 
}));

// User Service (Protected)
app.use('/users', validateToken, createProxyMiddleware({ 
  target: config.services.user, 
  changeOrigin: true 
}));

// Event Service (Public for GET public events, Protected for others)
// Complex routing: GET /events/public is public, POST /events is protected.
// For simplicity in gateway, we might route all /events and let Service handle public/private or split middleware here.
// But requirement says "All routes must be protected via the API Gateway...". 
// Wait, public events MUST be accessible without login? 
// "GET /events/public: Filter by city (Strict visibility rule for paid events)"
// Usually public events are public. I will allow /events to pass through and use finer grain auth or 
// if strict rule "All routes must be protected" implies even public feed needs generic auth?
// Let's look at Plan Phase 6: "Login/Register" is first. "Home Feed" follows. 
// Usually Home Feed requires User Context (to know "My City" etc)? 
// But "GET /events/public" implies public. 
// Plan Phase 1 says "Implement JWT validation... middleware".
// I will apply validateToken to specific paths or globally with exclusions.
// Let's route '/events/public' without auth, and others with auth.

app.use('/events/public', createProxyMiddleware({
  target: config.services.event,
  changeOrigin: true
}));

app.use('/events', validateToken, createProxyMiddleware({ 
  target: config.services.event, 
  changeOrigin: true 
}));

// Booking Service (Protected)
app.use('/bookings', validateToken, createProxyMiddleware({ 
  target: config.services.booking, 
  changeOrigin: true 
}));

// Payment Service (Protected)
// Webhook might be public but needs signature verification. 
// Webhook route: /payments/webhook.
app.use('/payments/webhook', createProxyMiddleware({
    target: config.services.payment,
    changeOrigin: true
}));

app.use('/payments', validateToken, createProxyMiddleware({ 
  target: config.services.payment, 
  changeOrigin: true 
}));

// Approval Service (Protected)
app.use('/approvals', validateToken, createProxyMiddleware({ 
  target: config.services.approval, 
  changeOrigin: true 
}));

// QR Service (Protected)
app.use('/qr', validateToken, createProxyMiddleware({ 
  target: config.services.qr, 
  changeOrigin: true 
}));

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start Server
app.listen(config.port, () => {
  console.log(`API Gateway running on port ${config.port}`);
});
