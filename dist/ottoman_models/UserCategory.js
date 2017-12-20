'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ottoman = require('ottoman');

var _ottoman2 = _interopRequireDefault(_ottoman);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userCategoryModel = _ottoman2.default.model({
  sid: {
    type: String,
    unique: true,
    default: _v2.default
  },
  userType: {
    type: String,
    required: true
  },
  schoolId: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  created: {
    type: String,
    default: Date.now,
    required: true
  }
});

exports.default = userCategoryModel;
//# sourceMappingURL=UserCategory.js.map