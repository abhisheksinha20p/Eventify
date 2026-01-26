import { Response } from 'express';
import Device from '../models/Device';
import { AuthRequest } from '../middleware/authMiddleware';

// @desc    Register Device Token
// @route   POST /notifications/register-device
// @access  Private
export const registerDevice = async (req: AuthRequest, res: Response) => {
  try {
    const { fcmToken, platform } = req.body;
    const userId = req.user.id;

    if (!fcmToken || !platform) {
        res.status(400).json({ message: 'Token and platform are required' });
        return;
    }

    // Upsert logic: If token exists, update user. If user exists with diff token, add new provided token?
    // One user can have multiple devices. One token is one device.
    // If token exists, make sure it's assigned to this user and active.
    
    let device = await Device.findOne({ fcmToken });

    if (device) {
        device.userId = userId;
        device.platform = platform;
        device.isActive = true;
        await device.save();
    } else {
        device = await Device.create({
            userId,
            fcmToken,
            platform
        });
    }

    res.status(200).json(device);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
