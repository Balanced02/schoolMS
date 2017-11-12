'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var departmentSchema = new _mongoose2.default.Schema({
  id: {
    type: String,
    default: _v2.default,
    unique: true
  },
  departmentTitle: {
    type: String,
    required: true,
    trim: true
  }
});

exports.default = _mongoose2.default.model('Department', departmentSchema);
//# sourceMappingURL=Department.js.map