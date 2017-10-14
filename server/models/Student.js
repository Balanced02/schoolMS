import mongoose from 'mongoose';
import uuid from 'uuid/v4';

import validator from 'validator';

let studentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  hash: {
    type: String,
  },
  uid: {
    type: String,
    default: uuid,
  },
  classs: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  accepted: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('Student', studentSchema);
