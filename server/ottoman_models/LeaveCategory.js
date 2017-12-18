import uuid from 'uuid/v4';
import mongoose from 'mongoose';

let leaveCategorySchema = new mongoose.Schema({
  sid: {
    type: String,
    required: true,
    default: uuid,
  },
  category: {
    type: String,
    required: true,
  },
  schoolId: {
    type: String,
    required: true,
  },
  created: {
    type: String,
    default: Date.now,
    required: true,
  },
});

export default mongoose.model('LeaveCategory', leaveCategorySchema);
