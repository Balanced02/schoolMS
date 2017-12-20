'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ParentSchema = new _mongoose2.default.Schema({
  sid: {
    type: String,
    unique: true,
    required: true,
    default: _v2.default
  },
  schoolId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  occupation: {
    type: String,
    required: true
  },
  officeAddress: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }

});

exports.default = _mongoose2.default.model('Parent', ParentSchema);
//# sourceMappingURL=Parent.js.map