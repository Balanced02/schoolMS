'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginStudent = exports.RegisterStudent = undefined;

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _Student = require('../models/Student');

var _Student2 = _interopRequireDefault(_Student);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RegisterStudent = exports.RegisterStudent = function RegisterStudent(req, res) {
  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password,
      name = _req$body.name,
      phone = _req$body.phone;

  if (!username || !password || !name || !phone) return res.status(401).json({ message: 'Some Credentials not Provided.' });
  _bcrypt2.default.hash(password, 8, function (err, hash) {
    if (err) return res.status(500).json(err);
    // Store hash in your password DB.
    _Student2.default.create({
      username: username,
      password: password,
      hash: hash,
      name: name,
      phone: phone
    }).then(function (student) {
      return res.json(student);
    }).catch(function (err) {
      return res.status(500).json(err);
    });
  });
};

var LoginStudent = exports.LoginStudent = function LoginStudent(req, res) {
  var _req$body2 = req.body,
      username = _req$body2.username,
      password = _req$body2.password;

  _Student2.default.findOne({ username: username }).then(function (student) {
    if (!student) {
      return res.status(401).json({ message: 'Username is Incorrect' });
    }
    _bcrypt2.default.compare(password, student.hash, function (err, result) {
      if (err) return res.status(400).json(err);
      if (result) {
        return res.json(student);
      } else {
        return res.status(401).json({ messgae: 'Username or Password Incorrect' });
      }
    });
  }).catch(function (err) {
    console.error(err);
    res.status(500).json(err);
  });
};
//# sourceMappingURL=auth.controller.js.map