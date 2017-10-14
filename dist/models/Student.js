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

var studentSchema = new _mongoose2.default.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String },
  hash: { type: String },
  uid: { type: String, default: _v2.default },
  classs: { type: String, default: '' },
  name: { type: String, required: true },
  phone: { type: String },
  accepted: { type: Boolean, default: false }
});

exports.default = _mongoose2.default.model('Student', studentSchema);
//# sourceMappingURL=Student.js.map