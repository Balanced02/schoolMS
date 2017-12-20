'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ottoman = require('ottoman');

var _ottoman2 = _interopRequireDefault(_ottoman);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var studentModel = _ottoman2.default.model('Student', {
  sid: {
    type: String,
    unique: true,
    required: true,
    default: _v2.default
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  schoolId: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  },
  surName: {
    type: String,
    required: true
  },
  otherNames: {
    type: String,
    required: true
  },
  dob: {
    type: Date
  },
  gender: {
    type: String,
    required: true
  },
  bloodGroup: {
    type: String,
    required: true
  },
  religion: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true,
    required: true
  },
  phone: {
    type: String
  },
  lSchName: {
    type: String,
    trim: true
  },
  lSchAddress: {
    type: String,
    trim: true
  },
  lSchQualification: {
    type: String,
    trim: true
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
  },
  accepted: {
    type: Boolean,
    default: false
  }
});

exports.default = studentModel;
//# sourceMappingURL=Student.js.map