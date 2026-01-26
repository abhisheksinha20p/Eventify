import mongoose, { Document, Schema } from 'mongoose';

export interface IProfile extends Document {
  accountId: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  avatarUrl?: string;
  phoneNumber?: string;
}

const ProfileSchema: Schema = new Schema({
  accountId: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  city: {
    type: String,
  },
  avatarUrl: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
}, {
  timestamps: true,
});

const Profile = mongoose.model<IProfile>('Profile', ProfileSchema);

export default Profile;
