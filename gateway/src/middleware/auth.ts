import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

interface AuthRequest extends Request {
  user?: any;
}

export const validateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
     res.status(401).json({ message: 'Authorization header missing' });
     return;
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
     res.status(401).json({ message: 'Token missing' });
     return;
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
     res.status(403).json({ message: 'Invalid or expired token' });
     return;
  }
};
