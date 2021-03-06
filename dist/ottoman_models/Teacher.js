'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ottoman = require('ottoman');

var _ottoman2 = _interopRequireDefault(_ottoman);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var teacherModel = _ottoman2.default.model({
  sid: {
    type: String,
    unique: true,
    default: _v2.default
  },
  phoneNumber: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    trim: true,
    required: true
  },
  schoolId: {
    type: String,
    required: true
  },
  username: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    default: 'noemail@mail.com'
  },
  userType: {
    type: String,
    lowercase: true,
    trim: true,
    required: true
  },
  designation: {
    type: String
  },
  dob: {
    type: Date
  },
  joiningDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  gender: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    required: true
  },
  classInfo: {
    type: String,
    default: ''
  },
  created: {
    type: Date,
    default: Date.now,
    required: true
  },
  totalExperience: {
    type: String,
    default: 0
  },
  pName: {
    type: String,
    required: false
  },
  pPhoneNumber: {
    type: String,
    required: false
  },
  pOccupation: {
    type: String,
    required: false
  },
  pEmail: {
    type: String,
    required: true,
    default: 'nomail@nomail.com'
  },
  pAddress: {
    type: String,
    required: false
  },
  accountNo: {
    type: String
  },
  sortCode: {
    type: String
  },
  bankName: {
    type: String
  },
  accountType: {
    type: String
  }
});

exports.default = teacherModel;
//# sourceMappingURL=Teacher.js.map