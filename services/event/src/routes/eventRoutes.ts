import express from 'express';
import { createEvent, getPublicEvents, verifyPrivateEvent, getEventById } from '../controllers/eventController';
import { extractUser, protect, organizerOnly } from '../middleware/authMiddleware';

const router = express.Router();

// Middleware to extract user for all routes (if token exists)
router.use(extractUser);

// Routes
router.post('/', protect, organizerOnly, createEvent);
router.get('/', getPublicEvents); // Filter by city, mapped from /events/public
router.get('/private/verify', verifyPrivateEvent);
router.get('/:id', getEventById); 

export default router;
