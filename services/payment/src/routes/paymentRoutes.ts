import express from 'express';
import { createPaymentIntent, handleWebhook } from '../controllers/paymentController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/create-intent', protect as any, createPaymentIntent as any);
router.post('/', express.raw({type: 'application/json'}), handleWebhook as any); 

export default router;
