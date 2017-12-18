import mongoose from 'mongoose';
import uuid from 'uuid/v4';

const Schema = mongoose.Schema;

const StudentCategorySchema = new Schema({
  sid: {
    type: String,
    unique: true,
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
    type: Date,
    default: Date.now,
    required: true,
  },
});

export default mongoose.model('StudentCategory', StudentCategorySchema);
