import mongoose from 'mongoose';

let noticeSchema = new mongoose.Schema({
  sid: {
    type: String,
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
