'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ottoman = require('ottoman');

var _ottoman2 = _interopRequireDefault(_ottoman);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var academicDetailsModel = _ottoman2.default.model('AcademicDetails', {
  sid: {
    type: String,
    required: true,
    default: _v2.default
  },
  startYear: {
    type: String,
    required: true
  },
  endYear: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  created: {
    type: String,
    default: Date.now,
    required: true
  },
  schoolId: {
    type: String,
    required: true
  }
});

exports.default = academicDetailsModel;
//# sourceMappingURL=AcademicDetails.js.map