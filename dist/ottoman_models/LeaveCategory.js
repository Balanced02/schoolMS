'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _ottoman = require('ottoman');

var _ottoman2 = _interopRequireDefault(_ottoman);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var leaveCategoryModel = _ottoman2.default.model('LeaveCategory', {
  sid: {
    type: String,
    required: true,
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
    type: String,
    default: Date.now,
    required: true
  }
});

exports.default = leaveCategoryModel;
//# sourceMappingURL=LeaveCategory.js.map