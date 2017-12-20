'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ottoman = require('ottoman');

var _ottoman2 = _interopRequireDefault(_ottoman);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var noticeModel = _ottoman2.default.model('Notice', {
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

exports.default = noticeModel;
//# sourceMappingURL=Notice.js.map