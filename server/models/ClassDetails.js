import mongoose from 'mongoose';

let classSchema = new mongoose.Schema({
  sid: {
    type: String,
    required: true,
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
