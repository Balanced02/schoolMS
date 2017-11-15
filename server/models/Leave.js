import mongoose from 'mongoose';
import uuid from 'uuid/v4';

let leaveSchema = new mongoose.Schema({
  sid: {
    type: String,
    required: true,
    default: uuid,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  schoolId: {
    type: String,
    required: true,
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
    required: true,
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
