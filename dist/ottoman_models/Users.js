'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _passportLocalMongoose = require('passport-local-mongoose');

var _passportLocalMongoose2 = _interopRequireDefault(_passportLocalMongoose);

var _http = require('http');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _ottoman = require('ottoman');

var _ottoman2 = _interopRequireDefault(_ottoman);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var usersModel = {
  sid: {
    type: String,
    required: true,
    default: _v2.default
  },
  schoolId: {
    type: String,
    required: true
  },
  username: {
    type: String,
    trim: true,
    unique: true
  },
  userType: {
    type: String,
    lowercase: true,
    trim: true,
    required: true
  },
  module: {
    type: String,
    lowercase: true,
    default: 'bronze'
  }
};

usersModel.plugin(_passportLocalMongoose2.default);

exports.default = usersModel;
//# sourceMappingURL=Users.js.map