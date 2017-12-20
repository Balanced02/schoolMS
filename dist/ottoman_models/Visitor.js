'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ottoman = require('ottoman');

var _ottoman2 = _interopRequireDefault(_ottoman);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var visitorModel = _ottoman2.default.model('Visitor', {
  sid: {
    type: String,
    unique: true,
    default: _v2.default
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
  schoolId: {
    type: String,
    required: true
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

exports.default = mongoose.model('Visitor', visitorSchema);
//# sourceMappingURL=Visitor.js.map