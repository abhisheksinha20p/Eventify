import { Request, Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
  user: any;
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
    // Basic extraction/protection. Relying on Gateway for hard auth, but extracting user context here.
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        const jwt = require('jsonwebtoken');
        try {
            const decoded = jwt.decode(token);
            req.user = decoded;
            next();
        } catch (e) {
             res.status(401).json({ message: 'Not authorized' });
        }
    } else {
         res.status(401).json({ message: 'Not authorized' });
    }
};
