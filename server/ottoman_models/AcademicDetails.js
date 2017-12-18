import uuid from 'uuid/v4';
import mongoose from 'mongoose';

let academicDetailsSchema = new mongoose.Schema({
  sid: {
    type: String,
    required: true,
    default: uuid,
  },
  startYear: {
    type: String,
    required: true,
  },
  endYear: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  created: {
    type: String,
    default: Date.now,
    required: true,
  },
  schoolId: {
    type: String,
    required: true,
  },
});

export default mongoose.model('AcademicDetails', academicDetailsSchema);
