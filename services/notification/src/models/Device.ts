import mongoose, { Document, Schema } from 'mongoose';

export interface IDevice extends Document {
  userId: string;
  fcmToken: string;
  platform: 'ios' | 'android' | 'web';
  isActive: boolean;
}

const DeviceSchema: Schema = new Schema({
  userId: { type: String, required: true },
  fcmToken: { type: String, required: true, unique: true }, // Ensure one entry per token
  platform: { type: String, enum: ['ios', 'android', 'web'], required: true },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});



export default mongoose.model<IDevice>('Device', DeviceSchema);
