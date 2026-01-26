import express from 'express';
import { createPaymentIntent, handleWebhook } from '../controllers/paymentController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/create-intent', protect, createPaymentIntent);
router.post('/webhook', express.raw({type: 'application/json'}), handleWebhook); 

export default router;
