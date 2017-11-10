import mongoose from 'mongoose';
import uuid from 'uuid/v4';

let departmentSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuid,
    unique: true,
  },
  departmentTitle: {
    type: String,
    required: true,
    trim: true,
  },
});

export default mongoose.model('Department', departmentSchema);
