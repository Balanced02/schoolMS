'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _ottoman = require('ottoman');

var _ottoman2 = _interopRequireDefault(_ottoman);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adminModel = _ottoman2.default.model('Admin', {
  sid: {
    type: String,
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
  schoolId: {
    type: String,
    required: true
  },
  username: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    default: 'noemail@mail.com'
  },
  dob: {
    type: Date
  },
  gender: {
    type: String,
    trim: true
  },
  address: {
    type: String
  }
});

exports.default = adminModel;
//# sourceMappingURL=Admin.js.map