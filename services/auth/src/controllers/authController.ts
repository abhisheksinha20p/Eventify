import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Account from '../models/Account';

const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /auth/register
// @access  Public
export const register = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  try {
    const userExists = await Account.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const account = await Account.create({
      email,
      passwordHash: password,
      role: role || 'ATTENDEE',
    });

    if (account) {
      res.status(201).json({
        _id: account._id,
        email: account.email,
        role: account.role,
        token: generateToken(account._id.toString(), account.role),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /auth/login
// @access  Public
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const account = await Account.findOne({ email });

    if (account && (await account.matchPassword(password))) {
      res.json({
        _id: account._id,
        email: account.email,
        role: account.role,
        token: generateToken(account._id.toString(), account.role),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify email (Stub)
// @route   POST /auth/verify-email
// @access  Public
export const verifyEmail = async (req: Request, res: Response) => {
    // TODO: Implement actual email verification logic
    res.status(200).json({ message: 'Email verified successfully (Stub)' });
};
