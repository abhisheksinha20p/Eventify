import express from 'express';
import { generateQR, scanQR } from '../controllers/qrController';
import { protect, organizerOnly, extractUser } from '../middleware/authMiddleware';

const router = express.Router();

router.use(extractUser);

router.get('/:bookingId', protect, generateQR); // User gets their QR
router.post('/scan', protect, organizerOnly, scanQR); // Organizer scans

export default router;
