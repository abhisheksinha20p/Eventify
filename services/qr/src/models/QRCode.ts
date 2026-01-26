import mongoose, { Document, Schema } from 'mongoose';

export interface IQRCode extends Document {
  bookingId: string;
  code: string; // The secret token or JWT
  expiresAt: Date;
  status: 'ACTIVE' | 'USED' | 'EXPIRED';
}

const QRCodeSchema: Schema = new Schema({
  bookingId: { type: String, required: true },
  code: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  status: { type: String, enum: ['ACTIVE', 'USED', 'EXPIRED'], default: 'ACTIVE' }
}, {
  timestamps: true
});

export default mongoose.model<IQRCode>('QRCode', QRCodeSchema);
