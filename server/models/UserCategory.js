import mongoose from 'mongoose';

let userCategorySchema = new mongoose.Schema({
  sid: {
    type: String,
    unique: true,
  },
  userType: {
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
