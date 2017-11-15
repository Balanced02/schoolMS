import mongoose from 'mongoose';
import uuid from 'uuid/v4';

let userCategorySchema = new mongoose.Schema({
  sid: {
    type: String,
    unique: true,
    default: uuid,
  },
  userType: {
    type: String,
    required: true,
  },
  schoolId: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  created: {
    type: String,
    default: Date.now,
    required: true,
  },
});

export default mongoose.model('UserCategory', userCategorySchema);
