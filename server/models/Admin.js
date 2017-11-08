import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  sid: {
    type: String,
    unique: true,
    trim: true,
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
    required: true,
  },
});

export default mongoose.model('Admin', adminSchema);
