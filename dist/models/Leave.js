'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var leaveSchema = new _mongoose2.default.Schema({
  sid: {
    type: String,
    required: true,
    default: _v2.default
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  schoolId: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  teacherId: {
    type: String,
    required: true
  },
  reason: {
    type: String
  },
  status: {
    type: String,
    default: 'pending'
  },
  created: {
    type: Date,
    default: Date.now,
    required: true
  },
  edited: {
    type: Date
  }
});

exports.default = _mongoose2.default.model('Leave', leaveSchema);
//# sourceMappingURL=Leave.js.map