import mongoose from 'mongoose';
import uuid from 'uuid/v4';

import validator from 'validator';

let teacherSchema = new mongoose.Schema({
  sid: {
    type: String,
    default: uuid,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  hash: {
    type: String,
  },
  classs: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
  },
});

export default mongoose.model('Teacher', teacherSchema);
