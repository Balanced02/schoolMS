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
  id: {
    type: String,
    default: _v2.default,
    unique: true
  },
  classTitle: {
    type: String,
    required: true,
    trim: true
  },
  maxStudents: {
    type: String,
    required: true
  },
  students: {
    type: String,
    default: '0'
  },
  teacher: {
    type: String,
    required: true
  }
});

exports.default = _mongoose2.default.model('Class', classSchema);
//# sourceMappingURL=Class.js.map