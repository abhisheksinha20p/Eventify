import mongoose, { Document, Schema } from 'mongoose';

export interface IDecision extends Document {
  bookingId: string;
  eventId: string;
  organizerId: string; // Decision maker
  action: 'APPROVE' | 'REJECT';
  reason?: string;
}

const DecisionSchema: Schema = new Schema({
  bookingId: {
    type: String,
    required: true,
  },
  eventId: {
    type: String,
    required: true,
  },
  organizerId: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    enum: ['APPROVE', 'REJECT'],
    required: true,
  },
  reason: {
    type: String,
  },
}, {
  timestamps: true,
});

const Decision = mongoose.model<IDecision>('Decision', DecisionSchema);

export default Decision;
