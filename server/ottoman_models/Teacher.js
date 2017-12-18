import Ottoman from 'ottoman';
import uuid from 'uuid/v4';


const teacherModel = Ottoman.model({
  sid: {
    type: String,
    unique: true,
    default: uuid,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    trim: true,
    required: true,
  },
  schoolId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    default: 'noemail@mail.com',
  },
  userType: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },
  designation: {
    type: String,
  },
  dob: {
    type: Date,
  },
  joiningDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  gender: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  classInfo: {
    type: String,
    default: '',
  },
  created: {
    type: Date,
    default: Date.now,
    required: true,
  },
  totalExperience: {
    type: String,
    default: 0,
  },
  pName: {
    type: String,
    required: false,
  },
  pPhoneNumber: {
    type: String,
    required: false,
  },
  pOccupation: {
    type: String,
    required: false,
  },
  pEmail: {
    type: String,
    required: true,
    default: 'nomail@nomail.com',
  },
  pAddress: {
    type: String,
    required: false,
  },
  accountNo: {
    type: String,
  },
  sortCode: {
    type: String,
  },
  bankName: {
    type: String,
  },
  accountType: {
    type: String,
  },
});

export default teacherModel;