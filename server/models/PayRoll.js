import mongoose from 'mongoose';

let payRollSchema = new mongoose.Schema({
  payHeadType: {
    type: String,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  created: {
    type: String,
    default: Date.now,
    required: true,
  },
});
export default mongoose.model('PayR', payRollSchema);
