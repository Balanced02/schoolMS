'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var teacherSchema = new Schema({
  sid: {
    type: String,
    unique: true,
    trim: true,
    required: true
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
  designation: {},
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
  pOfficeAddress: {
    type: String,
    required: true
  },
  pAddress: {
    type: String,
    required: true
  }
});

exports.default = _mongoose2.default.model('Teacher', teacherSchema);
//# sourceMappingURL=Teacher.js.map