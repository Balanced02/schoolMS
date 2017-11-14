'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var adminSchema = new Schema({
  sid: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    trim: true,
    required: true
  },
  username: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    default: 'noemail@mail.com'
  },
  dob: {
    type: Date
  },
  gender: {
    type: String,
    trim: true
  },
  address: {
    type: String
  }
});

exports.default = _mongoose2.default.model('Admin', adminSchema);
//# sourceMappingURL=Admin.js.map