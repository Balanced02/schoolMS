import mongoose from 'mongoose';
import uuid from 'uuid/v4';

let classSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuid,
    unique: true,
  },
  classTitle: {
    type: String,
    required: true,
    trim: true,
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
