'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegisterStudent = exports.LoginStudent = exports.CreateSchool = exports.HomeController = undefined;

var _School = require('../models/School');

var _School2 = _interopRequireDefault(_School);

var _auth = require('./auth.controller');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HomeController = exports.HomeController = function HomeController(req, res) {
  res.render('index', { title: 'Express Babel Boilerplate' });
};

var CreateSchool = exports.CreateSchool = function CreateSchool(req, res) {
  // School(req).create({
  //   name: req.db_uri + "'s School",
  //   students: parseInt(Math.random() * 100),
  //   address: 'Random Address',
  // })
  res.send('School Created');
};

exports.LoginStudent = _auth.LoginStudent;
exports.RegisterStudent = _auth.RegisterStudent;
//# sourceMappingURL=index.js.map