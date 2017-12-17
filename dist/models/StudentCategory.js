'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var StudentCategorySchema = new Schema({
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

exports.default = _mongoose2.default.model('StudentCategory', StudentCategorySchema);
//# sourceMappingURL=StudentCategory.js.map