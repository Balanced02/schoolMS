'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var teacherSchema = new _mongoose2.default.Schema({
  sid: {
    type: String,
    default: _v2.default
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  hash: {
    type: String
  },
  classs: {
    type: String,
    default: ''
  },
  phone: {
    type: String
  }
});

exports.default = _mongoose2.default.model('Teacher', teacherSchema);
//# sourceMappingURL=Teacher.js.map