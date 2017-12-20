'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ottoman = require('ottoman');

var _ottoman2 = _interopRequireDefault(_ottoman);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StudentCategoryModel = _ottoman2.default.model('StudentCategory', {
  sid: {
    type: String,
    unique: true,
    default: _v2.default
  },
  category: {
    type: String,
    required: true
  },
  schoolId: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now,
    required: true
  }
});

exports.default = StudentCategoryModel;
//# sourceMappingURL=StudentCategory.js.map