'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var classSchema = new _mongoose2.default.Schema({
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

exports.default = _mongoose2.default.model('ClassDetails', classSchema);
//# sourceMappingURL=ClassDetails.js.map