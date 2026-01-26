import { Request, Response } from 'express';
import Profile from '../models/Profile';

export interface AuthRequest extends Request {
  headers: {
    authorization?: string;
    'x-user-id'?: string;
    'x-user-role'?: string;
  }
}

// @desc    Get current user profile
// @route   GET /users/me
// @access  Private
export const getMyProfile = async (req: AuthRequest, res: Response) => {
  // Ideally, Gateway passes x-user-id. If not, we might need to decode token.
  // Let's assume for this phase, we accept x-user-id or we need to decode.
  // Since I haven't configured Gateway to pass x-user-id yet, I will decode token here too or assumes Gateway is doing it.
  // Actually, standard microservice pattern: Gateway authorizes, Service acts. 
  // How does Service know WHO it is? -> Token is passed.
  
  // Let's parse the token here for now strictly to get ID.
  // Or check headers if I update Gateway.
  
  // TEMPORARY: I will use a simple "Trust Token" approach or just extract ID from token if present.
  
  try {
      // Logic: 
      // 1. Check if profile exists.
      // 2. Return profile.
      // 3. If not, maybe create one? (Lazy creation) or return 404.
      
      // I need to know the User ID.
      // I'll implement a helper to extract user from token for now in the service too.
      // This duplicates logic but ensures security if Gateway fails (Defense in Depth).
      
      // But wait, I don't want to duplicate shared secret management if unnecessary. 
      // I'll leave extracting from req interface for now.
      
      // Let's assume headers['x-user-id'] is NOT there yet (I need to update Gateway for that).
      // So I will decode the Bearer token.
      
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        res.status(401).json({ message: 'Not authorized' });
        return;
      }
      
      // I need jsonwebtoken here.
      const jwt = require('jsonwebtoken');
      const decoded = jwt.decode(token) as any;
      
      if (!decoded || !decoded.id) {
          res.status(401).json({ message: 'Invalid token' });
          return;
      }
      
      const userId = decoded.id;
      
      let profile = await Profile.findOne({ accountId: userId });
      
      if (!profile) {
          // Lazy creation for new users who don't have a profile yet
          profile = await Profile.create({ accountId: userId });
      }
      
      res.json(profile);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /users/me
// @access  Private
export const updateMyProfile = async (req: AuthRequest, res: Response) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
             res.status(401).json({ message: 'Not authorized' });
             return;
        }
        
        const jwt = require('jsonwebtoken');
        const decoded = jwt.decode(token) as any;
        const userId = decoded.id;
        
        const { firstName, lastName, city, avatarUrl, phoneNumber } = req.body;
        
        const profile = await Profile.findOne({ accountId: userId });
        
        if (profile) {
            profile.firstName = firstName || profile.firstName;
            profile.lastName = lastName || profile.lastName;
            profile.city = city || profile.city;
            profile.avatarUrl = avatarUrl || profile.avatarUrl;
            profile.phoneNumber = phoneNumber || profile.phoneNumber;
            
            const updatedProfile = await profile.save();
            res.json(updatedProfile);
        } else {
             // Create if not exists
            const newProfile = await Profile.create({
                accountId: userId,
                firstName,
                lastName,
                city,
                avatarUrl,
                phoneNumber
            });
            res.json(newProfile);
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
