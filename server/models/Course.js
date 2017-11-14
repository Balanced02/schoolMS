import mongoose from 'mongoose';
import uuid from 'uuid/v4';

let courseSchema = new mongoose.Schema({
  sid: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
    trim: true,
  },
  courseCode: {
    type: String,
    required: true,
    trim: true,
  },
  minAttendance: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Course', courseSchema);
