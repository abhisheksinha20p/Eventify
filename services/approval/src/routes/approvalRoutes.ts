import express from 'express';
import { getApplicants, decideBooking } from '../controllers/approvalController';
import { protect, organizerOnly } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/:eventId/applicants', protect, organizerOnly, getApplicants);
router.post('/:bookingId/decide', protect, organizerOnly, decideBooking);

export default router;
