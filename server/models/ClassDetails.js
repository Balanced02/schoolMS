import mongoose from 'mongoose';
import uuid from 'uuid/v4';

let classSchema = new mongoose.Schema({
  sid: {
    type: String,
    required: true,
    default: uuid,
  },
  classTitle: {
    type: String,
    required: true,
    trim: true,
  },
  schoolId: {
    type: String,
    required: true,
  },
  maxStudents: {
    type: String,
    required: true,
  },
  students: {
    type: Array,
    default: [],
  },
  teacher: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export default mongoose.model('ClassDetails', classSchema);
