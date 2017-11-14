import mongoose from 'mongoose';

let departmentSchema = new mongoose.Schema({
  sid: {
    type: String,
    required: true,
  },
  departmentTitle: {
    type: String,
    required: true,
    trim: true,
  },
});

export default mongoose.model('Department', departmentSchema);
