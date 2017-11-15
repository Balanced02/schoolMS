'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ref;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Schema = _mongoose2.default.Schema;

var schoolSchema = new Schema((_ref = {
  sid: {
    type: String,
    unique: true,
    trim: true,
    default: _v2.default,
    required: true
  },
  schoolName: {
    type: String,
    required: true
  },
  founded: {
    type: String
  },
  schoolId: {
    type: String,
    required: true
  },
  logo: {
    type: 'String',
    required: true
  },
  shortCode: {
    type: String,
    required: true
  },
  address: {
    type: String,
    trim: true,
    required: true
  }
}, _defineProperty(_ref, 'logo', {
  type: String,
  required: true
}), _defineProperty(_ref, 'phoneNumber', {
  type: String,
  trim: true,
  required: true
}), _defineProperty(_ref, 'fax', {
  type: String,
  trim: true,
  required: true
}), _defineProperty(_ref, 'country', {
  type: String,
  trim: true,
  required: true,
  default: 'Nigeria'
}), _defineProperty(_ref, 'email', {
  type: String,
  lowercase: true,
  trim: true,
  required: true,
  default: 'noemail@mail.com'
}), _defineProperty(_ref, 'address', {
  type: String,
  required: true
}), _defineProperty(_ref, 'created', {
  type: Date,
  required: true,
  default: Date.now
}), _ref));

exports.default = _mongoose2.default.model('School', schoolSchema);
//# sourceMappingURL=School.js.map