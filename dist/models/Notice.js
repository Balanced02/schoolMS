'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var noticeSchema = new _mongoose2.default.Schema({
  sid: {
    type: String,
    unique: true,
    default: _v2.default
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  body: {
    type: String,
    required: true,
    trim: true
  },
  schoolId: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  }
});

exports.default = _mongoose2.default.model('Notice', noticeSchema);
//# sourceMappingURL=Notice.js.map