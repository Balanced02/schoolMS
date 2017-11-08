import mongoose from 'mongoose';
import uuid from 'uuid/v4';

let leaveSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuid,
    unique: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  teacherId: {
    type: String,
    trim: true,
  },
  reason: {
    type: String,
  },
  status: {
    type: String,
    default: 'pending',
  },
  created: {
    type: Date,
    default: Date.now,
    required: true,
  },
  edited: {
    type: Date,
  },
});

export default mongoose.model('Leave', leaveSchema);
