'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ottoman = require('ottoman');

var _ottoman2 = _interopRequireDefault(_ottoman);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var courseModel = _ottoman2.default.model('Course', {
  sid: {
    type: String,
    required: true,
    default: _v2.default
  },
  courseName: {
    type: String,
    required: true,
    trim: true
  },
  schoolId: {
    type: String,
    required: true
  },
  courseCode: {
    type: String,
    required: true,
    trim: true
  },
  minAttendance: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

exports.default = courseModel;
//# sourceMappingURL=Course.js.map