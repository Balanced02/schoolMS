import mongoose from 'mongoose';

let leaveCategorySchema = new mongoose.Schema({
  category: {
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
