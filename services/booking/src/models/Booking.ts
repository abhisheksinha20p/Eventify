import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
  try: any;
  userId: string;
  eventId: string;
  slotId: string;
  status: 'PENDING_PAYMENT' | 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  paymentIntentId?: string;
  ticketCode?: string; // QR payload
}

const BookingSchema: Schema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  eventId: {
    type: String,
    required: true,
  },
  slotId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['PENDING_PAYMENT', 'PENDING_APPROVAL', 'APPROVED', 'REJECTED', 'CANCELLED'],
    default: 'PENDING_PAYMENT',
  },
  paymentIntentId: {
    type: String,
  },
  ticketCode: {
    type: String,
  }
}, {
  timestamps: true,
});

const Booking = mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
