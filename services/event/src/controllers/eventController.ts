import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import Event from '../models/Event';
import { v4 as uuidv4 } from 'uuid';

// @desc    Create new event
// @route   POST /events
// @access  Private (Organizer)
export const createEvent = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, type, city, location, slots } = req.body;

    // Generate event code for UNPAID events if not provided
    let eventCode = undefined;
    if (type === 'UNPAID') {
        eventCode = uuidv4().substring(0, 8).toUpperCase();
    }

    const event = await Event.create({
      organizerId: req.user.id,
      title,
      description,
      type,
      eventCode,
      city,
      location,
      slots
    });

    res.status(201).json(event);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get public events (Filtered by city)
// @route   GET /events/public
// @access  Public
export const getPublicEvents = async (req: AuthRequest, res: Response) => {
  try {
    const { city } = req.query;

    if (!city) {
        res.status(400).json({ message: 'City parameter is required for public feed' });
        return;
    }

    // "Strict visibility rule for paid events": 
    // Plan says "Filter by city (Strict visibility rule for paid events)".
    // Usually means: Users only see paid events in their city? 
    // Or maybe defaults to all, but optimized for city.
    // Plan: "GET /events/public: Filter by city".
    // I will return all published events in that city.
    
    // Note: Assuming 'PAID' events are the public ones usually? Or both?
    // Plan 3. Event Service: "Events collection... type (PAID/UNPAID)..."
    // "GET /events/public: Filter by city".
    
    const events = await Event.find({ 
        city: { $regex: new RegExp(city as string, 'i') }, // Case insensitive
        isPublished: true,
        // Only showing requests future events ideally, but kept simple.
    });

    res.json(events);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify private event code
// @route   GET /events/private/verify
// @access  Public (or Private?)
// Plan says: GET /events/private/verify
export const verifyPrivateEvent = async (req: AuthRequest, res: Response) => {
    try {
        const { code } = req.query;
        
        if (!code) {
             res.status(400).json({ message: 'Event code is required' });
             return;
        }

        const event = await Event.findOne({ eventCode: code });

        if (!event) {
             res.status(404).json({ message: 'Invalid event code' });
             return;
        }

        res.json(event);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get event by ID (Internal/Public if needed)
export const getEventById = async (req: AuthRequest, res: Response) => {
    try {
        const event = await Event.findById(req.params.id);
        if(event) {
            res.json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}
