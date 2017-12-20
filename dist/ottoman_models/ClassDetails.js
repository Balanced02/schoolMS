'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ottoman = require('ottoman');

var _ottoman2 = _interopRequireDefault(_ottoman);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var classModel = _ottoman2.default.model('Class', {
  sid: {
    type: String,
    required: true,
    default: _v2.default
  },
  classTitle: {
    type: String,
    required: true,
    trim: true
  },
  schoolId: {
    type: String,
    required: true
  },
  maxStudents: {
    type: String,
    required: true
  },
  students: {
    type: Array,
    default: []
  },
  teacher: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now,
    required: true
  }
});

exports.default = classModel;
//# sourceMappingURL=ClassDetails.js.map