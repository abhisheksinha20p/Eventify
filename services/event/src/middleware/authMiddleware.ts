import { Request, Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
  user?: any;
  headers: {
    authorization?: string;
    'x-user-id'?: string;
    'x-user-role'?: string;
  }
}

export const extractUser = (req: AuthRequest, res: Response, next: NextFunction) => {
    // For now, relies on gateway jwt or local decode if needed for protected routes.
    // Public routes might not have token.
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        const jwt = require('jsonwebtoken');
        // We just decode to get context, validation happened at Gateway
        try {
            const decoded = jwt.decode(token);
            req.user = decoded;
        } catch (e) {
            // Token invalid format, ignore
        }
    }
    next();
};

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) { // extractUser must run first
        res.status(401).json({ message: 'Not authorized' });
        return;
    }
    next();
};

export const organizerOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== 'ORGANIZER') {
        res.status(403).json({ message: 'Organizer access required' });
        return;
    }
    next();
};
