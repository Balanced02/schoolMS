'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ottoman = require('ottoman');

var _ottoman2 = _interopRequireDefault(_ottoman);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var noteModel = _ottoman2.default.model('Note', {
  sid: {
    type: String,
    unique: true,
    default: _v2.default
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
    default: Date.now
  }
});

exports.default = noteModel;
//# sourceMappingURL=Note.js.map