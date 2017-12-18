<<<<<<< HEAD
import mongoose from 'mongoose';
import uuid from 'uuid/v4';
=======
import mongoose from "mongoose";
import uuid from "uuid/v4";
>>>>>>> 01ba8c60c39f7a915a54fbd7a8feeff51929de31

const Schema = mongoose.Schema;

const studentGatePassSchema = new Schema({
  sid: {
    type: String,
    unique: true,
<<<<<<< HEAD
    default: uuid,
  },
  studentName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
=======
    default: uuid
  },
  studentName: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
>>>>>>> 01ba8c60c39f7a915a54fbd7a8feeff51929de31
  },
  personName: {
    type: String,
    trim: true,
<<<<<<< HEAD
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
=======
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
>>>>>>> 01ba8c60c39f7a915a54fbd7a8feeff51929de31
  },
  created: {
    type: Date,
    default: Date.now,
<<<<<<< HEAD
    required: true,
  },
});

export default mongoose.model('studentGatePass', studentGatePassSchema);
=======
    required: true
  }
});

export default mongoose.model("studentGatePass", studentGatePassSchema);
>>>>>>> 01ba8c60c39f7a915a54fbd7a8feeff51929de31
