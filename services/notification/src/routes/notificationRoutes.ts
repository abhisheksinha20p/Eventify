import express from 'express';
import { registerDevice } from '../controllers/notificationController';
import { protect, extractUser } from '../middleware/authMiddleware';

const router = express.Router();

router.use(extractUser);

router.post('/register-device', protect, registerDevice);

export default router;
