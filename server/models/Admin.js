import mongoose from 'mongoose';
import validator from 'validator';
import LocalMongoose from 'passport-local-mongoose';
import uuid from 'uuid/v4';

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  sid: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    default: uuid,
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

adminSchema.plugin(LocalMongoose);

export default mongoose.model('Admin', adminSchema);
