import mongoose from 'mongoose';
import uuid from 'uuid/v4';

import validator from 'validator';

let noticeSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuid,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  body: {
    type: String,
    required: true,
    trim: true,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default mongoose.model('Notice', noticeSchema);
