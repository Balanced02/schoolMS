import mongoose from 'mongoose';
import uuid from 'uuid/v4';

let departmentSchema = new mongoose.Schema({
  sid: {
    type: String,
    required: true,
    default: uuid,
  },
  departmentTitle: {
    type: String,
    required: true,
    trim: true,
  },
  schoolId: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Department', departmentSchema);
