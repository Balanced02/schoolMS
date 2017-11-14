'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var visitorSchema = new _mongoose2.default.Schema({
  sid: {
    type: String,
    unique: true
  },
  visitorName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  visiting: {
    type: String,
    required: true,
    trim: true
  },
  timeIn: {
    type: Date,
    required: true,
    default: Date.now
  },
  timeOut: {
    type: Date
  }
});

exports.default = _mongoose2.default.model('Visitor', visitorSchema);
//# sourceMappingURL=Visitor.js.map