import Ottoman from 'ottoman';
import uuid from "uuid/v4";


const studentGatePassModel = Ottoman.model({
  sid: {
    type: String,
    unique: true,
    default: uuid
  },
  studentName: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  personName: {
    type: String,
    trim: true,
    required: true
  },
  staffId: {
    type: String,
    trim: true,
    required: true
  },
  schoolId: {
    type: String,
    required: true
  },
  issueDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date
  },
  reason: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now,
    required: true
  }
});

export default studentGatePassModel;