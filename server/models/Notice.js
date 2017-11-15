import mongoose from 'mongoose';
import uuid from 'uuid/v4';

let noticeSchema = new mongoose.Schema({
  sid: {
    type: String,
    unique: true,
    default: uuid,
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
  schoolId: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default mongoose.model('Notice', noticeSchema);
