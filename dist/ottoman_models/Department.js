'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ottoman = require('ottoman');

var _ottoman2 = _interopRequireDefault(_ottoman);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var departmentModel = _ottoman2.default.model('Department', {
  sid: {
    type: String,
    required: true,
    default: _v2.default
  },
  departmentTitle: {
    type: String,
    required: true,
    trim: true
  },
  schoolId: {
    type: String,
    required: true
  }
});

exports.default = departmentModel;
//# sourceMappingURL=Department.js.map