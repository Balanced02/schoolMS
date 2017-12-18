import mongoose from 'mongoose';
import Ottoman from 'ottoman';
import uuid from 'uuid/v4';


const adminModel = Ottoman.model('Admin',{
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

export default adminModel;
