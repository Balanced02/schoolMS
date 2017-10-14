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
    type: String,
    default: '0',
  },
  teacher: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Class', classSchema);
