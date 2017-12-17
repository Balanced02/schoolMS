"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _v = require("uuid/v4");

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var studentGatePassSchema = new Schema({
  sid: {
    type: String,
    unique: true,
    default: _v2.default
  },
  studentName: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  personName: {
    type: String,
    trim: true,
    required: true
  },
  staffId: {
    type: String,
    trim: true,
    required: true
  },
  schoolId: {
    type: String,
    required: true
  },
  issueDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date
  },
  reason: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now,
    required: true
  }
});

exports.default = _mongoose2.default.model("studentGatePass", studentGatePassSchema);
//# sourceMappingURL=studentGatePass.js.map