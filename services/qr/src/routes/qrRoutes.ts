import express from 'express';
import { generateQR, scanQR } from '../controllers/qrController';
import { protect, organizerOnly, extractUser } from '../middleware/authMiddleware';

const router = express.Router();

router.use(extractUser as any);

router.get('/:bookingId', protect as any, generateQR as any); // User gets their QR
router.post('/scan', protect as any, organizerOnly as any, scanQR as any); // Organizer scans

export default router;
