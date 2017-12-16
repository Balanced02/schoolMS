import mongoose from 'mongoose';
import uuid from 'uuid/v4';

const Schema = mongoose.Schema;

const studentGatePassSchema = new Schema({
  sid: {
    type: String,
    unique: true,
    default: uuid,
  },
  studentName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  personName: {
    type: String,
    trim: true,
    required: true,
  },
    employeeName: {
    type: String,
    trim: true,
    required: true,
  },
  schoolId: {
    type: String,
    required: true,
  },
 
  issueDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
 
  reason: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export default mongoose.model('studentGatePass', studentGatePassSchema);
