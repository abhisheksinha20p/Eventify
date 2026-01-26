import express from 'express';
import { createBooking, getMyBookings, updateBookingStatus } from '../controllers/bookingController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/my', protect, getMyBookings);
router.patch('/:id/status', updateBookingStatus); // Internal use, add middleware if needed (e.g. check secret)

export default router;
