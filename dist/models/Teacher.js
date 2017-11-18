'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var teacherSchema = new Schema({
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
    required: true
  },
  pPhoneNumber: {
    type: String,
    required: true
  },
  pOccupation: {
    type: String,
    required: true
  },
  pEmail: {
    type: String,
    required: true,
    default: 'nomail@nomail.com'
  },
  pAddress: {
    type: String,
    required: true
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

exports.default = _mongoose2.default.model('Teacher', teacherSchema);
//# sourceMappingURL=Teacher.js.map