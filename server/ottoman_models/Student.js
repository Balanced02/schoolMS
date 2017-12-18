import mongoose from 'mongoose';
import uuid from 'uuid/v4';

let studentSchema = new mongoose.Schema({
  sid: {
    type: String,
    unique: true,
    required: true,
    default: uuid,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  schoolId: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: '',
  },
  surName: {
    type: String,
    required: true,
  },
  otherNames: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  religion: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
    required: true,
  },
  phone: {
    type: String,
  },
  lSchName: {
    type: String,
    trim: true,
  },
  lSchAddress: {
    type: String,
    trim: true,
  },
  lSchQualification: {
    type: String,
    trim: true,
  },
  pName: {
    type: String,
    required: true,
  },
  pPhoneNumber: {
    type: String,
    required: true,
  },
  pOccupation: {
    type: String,
    required: true,
  },
  pOfficeAddress: {
    type: String,
    required: true,
  },
  pAddress: {
    type: String,
    required: true,
  },
  accepted: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('Student', studentSchema);
