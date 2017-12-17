'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var payHeadSchema = new _mongoose2.default.Schema({
  sid: {
    type: String,
    unique: true,
    default: _v2.default
  },
  payHeadType: {
    type: String,
    required: true
  },
  schoolId: {
    type: String,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  },
  method: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  created: {
    type: String,
    default: Date.now,
    required: true
  }
});
exports.default = _mongoose2.default.model('PayHead', payHeadSchema);
//# sourceMappingURL=PayHead.js.map