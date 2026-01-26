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
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        // Simple decode for internal use
        try {
             const base64Url = token.split('.')[1];
             const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
             const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                 return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
             }).join(''));
             req.user = JSON.parse(jsonPayload);
        } catch (e) {}
    }
    next();
};

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
        res.status(401).json({ message: 'Not authorized' });
        return;
    }
    next();
};

export const organizerOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== 'ORGANIZER' && req.user?.role !== 'ADMIN') { // Gatekeeper role?
        res.status(403).json({ message: 'Organizer access required' });
        return;
    }
    next();
};
