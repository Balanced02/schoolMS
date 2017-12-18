import mongoose from 'mongoose';
import uuid from 'uuid/v4';

let noteSchema = new mongoose.Schema({
  sid: {
    type: String,
    unique: true,
    default: uuid,
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
    default: Date.now,
  },
});

export default mongoose.model('Note', noteSchema);
