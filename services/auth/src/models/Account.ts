import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IAccount extends Document {
  email: string;
  passwordHash: string;
  role: 'ATTENDEE' | 'ORGANIZER';
  isVerified: boolean;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const AccountSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['ATTENDEE', 'ORGANIZER'],
    default: 'ATTENDEE',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

AccountSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.passwordHash);
};

AccountSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    next();
  } catch (err: any) {
    next(err);
  }
});

const Account = mongoose.model<IAccount>('Account', AccountSchema);

export default Account;
