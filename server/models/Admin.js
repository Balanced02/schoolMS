import mongoose from 'mongoose';
import uuid from 'uuid/v4';

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  sid: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    trim: true,
    required: true,
  },
  schoolId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    default: 'noemail@mail.com',
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
  },
});

export default mongoose.model('Admin', adminSchema);
