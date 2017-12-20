'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Ottoman$model;

var _ottoman = require('ottoman');

var _ottoman2 = _interopRequireDefault(_ottoman);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var schoolModel = _ottoman2.default.model('School', (_Ottoman$model = {
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
    type: String,
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
}, _defineProperty(_Ottoman$model, 'logo', {
  type: String,
  required: true
}), _defineProperty(_Ottoman$model, 'phoneNumber', {
  type: String,
  trim: true,
  required: true
}), _defineProperty(_Ottoman$model, 'fax', {
  type: String,
  trim: true
}), _defineProperty(_Ottoman$model, 'country', {
  type: String,
  trim: true,
  required: true,
  default: 'Nigeria'
}), _defineProperty(_Ottoman$model, 'email', {
  type: String,
  lowercase: true,
  trim: true,
  required: true,
  default: 'noemail@mail.com'
}), _defineProperty(_Ottoman$model, 'address', {
  type: String,
  required: true
}), _defineProperty(_Ottoman$model, 'created', {
  type: Date,
  required: true,
  default: Date.now
}), _Ottoman$model));

exports.default = schoolModel;
//# sourceMappingURL=School.js.map