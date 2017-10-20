import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const teacherSchema = new Schema({
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
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    default: 'noemail@mail.com',
  },
  userType: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
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
  classInfo: {
    type: String,
    default: '',
  },
  created: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export default mongoose.model('Teacher', teacherSchema);
