import express from 'express';
import { createBooking, getMyBookings, updateBookingStatus } from '../controllers/bookingController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', protect as any, createBooking as any);
router.get('/my', protect as any, getMyBookings as any);
router.patch('/:id/status', updateBookingStatus as any); // Internal use, add middleware if needed (e.g. check secret)

export default router;
