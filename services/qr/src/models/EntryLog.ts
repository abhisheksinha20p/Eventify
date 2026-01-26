import mongoose, { Document, Schema } from 'mongoose';

export interface IEntryLog extends Document {
  bookingId: string;
  scannedBy: string; // Organizer ID or Gatekeeper
  scannedAt: Date;
  result: 'GRANTED' | 'DENIED';
  reason?: string;
}

const EntryLogSchema: Schema = new Schema({
  bookingId: { type: String, required: true },
  scannedBy: { type: String, required: true },
  scannedAt: { type: Date, default: Date.now },
  result: { type: String, enum: ['GRANTED', 'DENIED'], required: true },
  reason: { type: String }
}, {
  timestamps: true
});

export default mongoose.model<IEntryLog>('EntryLog', EntryLogSchema);
