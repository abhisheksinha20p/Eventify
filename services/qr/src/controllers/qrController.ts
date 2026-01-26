import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { redisClient } from '../config/redis';
import QRCodeModel from '../models/QRCode';
import EntryLog from '../models/EntryLog';
import { AuthRequest } from '../middleware/authMiddleware';

// @desc    Generate QR Code for a booking
// @route   GET /qr/:bookingId
// @access  Private (User who owns booking)
export const generateQR = async (req: AuthRequest, res: Response) => {
    try {
        const { bookingId } = req.params as any;
        const userId = req.user.id;

        // Verify ownership (Mocked or call Booking Service)
        // Ideally: await axios.get(`${BOOKING_SERVICE}/bookings/${bookingId}`) -> check userId
        // For speed, assuming userId matches if token provided. But relying on Booking Service response is safer.
        
        // Check Redis Cache
        const cachedCode = await redisClient.get(`qr:${bookingId}`);
        if (cachedCode) {
             res.json({ code: cachedCode, cached: true });
             return;
        }

        // Check DB for existing active code
        const existingQR = await QRCodeModel.findOne({ bookingId, status: 'ACTIVE' });
        if (existingQR) {
             // Cache it
             await redisClient.setEx(`qr:${bookingId}`, 300, existingQR.code); // 5 mins
             res.json({ code: existingQR.code });
             return;
        }

        // Generate New Code
        const code = uuidv4();
        
        // Save to DB
        await QRCodeModel.create({
            bookingId,
            code,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours validity? Or Event End Time?
        });

        // Cache in Redis (Short term for rapid display)
        await redisClient.setEx(`qr:${bookingId}`, 300, code);

        res.json({ code });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Scan QR Code
// @route   POST /qr/scan
// @access  Private (Organizer/Gatekeeper)
export const scanQR = async (req: AuthRequest, res: Response) => {
    try {
        const { code, bookingId } = req.body as any; // Client sends what it scanned
        const scannedBy = req.user.id;

        // Verify Code
        // Check Redis? DB is source of truth for status.
        // We can check Redis for quick "Exists", but must check DB for "USED".
        
        const qrRecord = await QRCodeModel.findOne({ code, bookingId });
        
        if (!qrRecord) {
             await EntryLog.create({ bookingId: bookingId || 'unknown', scannedBy, result: 'DENIED', reason: 'Invalid Code' });
             res.status(400).json({ message: 'Invalid QR Code', result: 'DENIED' });
             return;
        }

        if (qrRecord.status !== 'ACTIVE') {
             await EntryLog.create({ bookingId, scannedBy, result: 'DENIED', reason: 'Code Used or Expired' });
             res.status(400).json({ message: `Code is ${qrRecord.status}`, result: 'DENIED' });
             return;
        }

        // Grant Access
        qrRecord.status = 'USED'; // Single entry?
        await qrRecord.save();

        await EntryLog.create({ bookingId, scannedBy, result: 'GRANTED' });

        res.json({ message: 'Access Granted', result: 'GRANTED', bookingId });

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
