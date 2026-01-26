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
    if (!req.user) { // Gateway validation relied upon, but extraction needed
        res.status(401).json({ message: 'Not authorized' });
        return;
    }
    next();
};
