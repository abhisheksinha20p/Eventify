import { Response } from 'express';
import axios from 'axios';
import Decision from '../models/Decision';
import { AuthRequest } from '../middleware/authMiddleware';

// Service URLs
const BOOKING_SERVICE_URL = process.env.BOOKING_SERVICE_URL || 'http://localhost:3004/bookings';
const QR_SERVICE_URL = process.env.QR_SERVICE_URL || 'http://localhost:3007/qr';

// @desc    Get applicants for an event (List pending bookings)
// @route   GET /approvals/:eventId/applicants
// @access  Private (Organizer)
export const getApplicants = async (req: AuthRequest, res: Response) => {
    try {
        const { eventId } = req.params;
        // Need to query Booking Service for bookings with status PENDING_APPROVAL and eventId
        // But Booking Service currently only has `getMyBookings`. 
        // We probably need `POST /bookings/query` or `GET /bookings/event/:eventId` (Organizer view).
        // For Phase 3, I will assume we can't easily query cross-service without that endpoint.
        // Implementation Plan didn't specify "Get Event Bookings" endpoint in Booking Service.
        // I will add a TODO or mock it. 
        // Wait, "GET /approvals/{eventId}/applicants: List pending users". 
        // Approval Service doesn't store bookings. It checks Booking Service.
        
        // Strategy: Approval Service stores nothing but decisions?
        // Yes, "Create decisions collection for audit logs". 
        // So `getApplicants` technically proxies to Booking Service.
        
        // I should have added `GET /bookings/event/:eventId` to Booking Service.
        // I will return a placeholder or try to implement it if I can access Booking DB? NO.
        // I will assume for this phase, we just return "Not Implemented - Requires Booking Service Update".
        // OR better: I'll quickly add the endpoint to Booking Service "Get Bookings by Event" (Organizer only).
        // But let's finish Approval Controller logic first.
        
        res.status(501).json({ message: 'Fetching applicants requires Booking Service update' });

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Make a decision (Approve/Reject)
// @route   POST /approvals/:bookingId/decide
// @access  Private (Organizer)
export const decideBooking = async (req: AuthRequest, res: Response) => {
    try {
        const { bookingId } = req.params;
        const { action, eventId } = req.body; // action: APPROVE | REJECT

        if (!['APPROVE', 'REJECT'].includes(action)) {
             res.status(400).json({ message: 'Invalid action' });
             return;
        }

        // 1. Log Decision
        const decision = await Decision.create({
            bookingId: bookingId as string,
            eventId: eventId as string,
            organizerId: req.user.id,
            action
        });

        // 2. Update Booking Status
        const status = action === 'APPROVE' ? 'APPROVED' : 'REJECTED';
        await axios.patch(`${BOOKING_SERVICE_URL}/${bookingId}/status`, { status });

        // 3. If Approved, Trigger QR Generation
        if (action === 'APPROVE') {
            // Call QR Service (Fire and Forget or Await)
            // await axios.post(`${QR_SERVICE_URL}/generate`, { bookingId });
            console.log(`[Mock] QR Generation triggered for booking ${bookingId}`);
        }

        res.json(decision);
    } catch (error: any) {
        console.error('Error in decision flow:', error.message);
        res.status(500).json({ message: 'Error processing decision', error: error.message });
    }
};
