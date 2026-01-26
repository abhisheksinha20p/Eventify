import mongoose, { Document, Schema } from 'mongoose';

export interface ISlot {
    _id?: string;
    startTime: Date;
    endTime: Date;
    capacity: number;
    bookedCount: number;
    price: number; // In cents
}

export interface IEvent extends Document {
  organizerId: string;
  title: string;
  description?: string;
  type: 'PAID' | 'UNPAID';
  eventCode?: string; // Unique for unpaid
  city: string;
  location: {
      address: string;
      lat: number;
      lng: number;
  };
  slots: ISlot[];
  isPublished: boolean;
}

const SlotSchema = new Schema({
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    capacity: { type: Number, required: true },
    bookedCount: { type: Number, default: 0 },
    price: { type: Number, required: true }
});

const EventSchema: Schema = new Schema({
  organizerId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    enum: ['PAID', 'UNPAID'],
    required: true,
  },
  eventCode: {
    type: String,
    unique: true,
    sparse: true // Only populated for UNPAID usually, or checked if unique not null
  },
  city: {
    type: String,
    required: true,
  },
  location: {
      address: { type: String, required: true },
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
  },
  slots: [SlotSchema],
  isPublished: {
      type: Boolean,
      default: true
  }
}, {
  timestamps: true,
});

const Event = mongoose.model<IEvent>('Event', EventSchema);

export default Event;
