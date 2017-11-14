'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var leaveCategorySchema = new _mongoose2.default.Schema({
  sid: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  created: {
    type: String,
    default: Date.now,
    required: true
  }
});

exports.default = _mongoose2.default.model('LeaveCategory', leaveCategorySchema);
//# sourceMappingURL=LeaveCategory.js.map