'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logout = exports.RedirectNoAuth = exports.AuthMe = exports.Login = exports.Register = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Users = require('../models/Users');

var _Users2 = _interopRequireDefault(_Users);

var _Teacher = require('../models/Teacher');

var _Teacher2 = _interopRequireDefault(_Teacher);

var _Student = require('../models/Student');

var _Student2 = _interopRequireDefault(_Student);

var _Admin = require('../models/Admin');

var _Admin2 = _interopRequireDefault(_Admin);

var _School = require('../models/School');

var _School2 = _interopRequireDefault(_School);

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Register = exports.Register = function Register(req, res) {
  var type = req.body.userType;
  var newUser = new _Users2.default(_extends({}, req.body, {
    userType: req.body.userType === 'school' ? 'admin' : req.body.userType
  }));
  _Users2.default.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      return res.status(400).json({
        message: err.message
      });
    } else {
      if (user.userType !== 'super') {
        if (user.userType) {
          createSchool(type, req.body, user.sid).then(function (user) {
            return res.json({
              message: 'Registered Successfully',
              user: _extends({}, user)
            });
          }).catch(function (err) {
            console.log(err);
            return res.status(400).json({
              message: err.message
            });
          });
        }
      } else {
        res.json({
          message: 'Registered Successfully',
          user: _extends({}, user)
        });
      }
    }
  });
};

var createSchool = function createSchool(userType, body, id) {
  console.log(userType);
  if (userType !== 'school') {
    return new Promise(function (resolve, reject) {
      console.log(body);
      createUser(userType, body, id).then(function (data) {
        return resolve(data);
      }).catch(function (err) {
        console.log(err);
        reject(err);
      });
    });
  }

  _School2.default.create(_extends({}, body)).then(function (user) {
    console.log(user);
    var adminObj = {
      email: user.email,
      username: user.shortCode,
      phoneNumber: user.phoneNumber,
      fullName: user.schoolName
    };
    return new Promise(function (resolve, reject) {
      return createUser('admin', adminObj, user.id).then(function (data) {
        return resolve(data);
      }).catch(function (err) {
        return reject(err);
      });
    });
  }).catch(function (err) {
    return reject(err);
  });
};

var createUser = function createUser(userType, body, id) {
  console.log('Creating: ' + userType);
  var User = userType === 'teacher' ? _Teacher2.default : userType === 'student' ? _Student2.default : userType === 'admin' ? _Admin2.default : _Teacher2.default;
  return new Promise(function (resolve, reject) {
    User.create(_extends({}, body, { sid: id })).then(function (user) {
      resolve(user);
    }).catch(function (err) {
      reject(err);
    });
  });
};

var Login = exports.Login = function Login(req, res) {
  var user = req.user;
  return res.json({
    message: 'Login Successful',
    user: _extends({}, req.user, {
      salt: undefined,
      hash: undefined
    })
  });
};

// Get user data from client side
var AuthMe = exports.AuthMe = function AuthMe(req, res) {
  if (req.user) {
    return res.json({
      authenticated: true,
      user: req.user
    });
  }
  return res.json({
    authenticated: false
  });
};

// Auth Middleware
var RedirectNoAuth = exports.RedirectNoAuth = function RedirectNoAuth(req, res, next) {
  if (!req.user) {
    return res.redirect('/whatever');
  }
  return next();
};

var Logout = exports.Logout = function Logout(req, res) {
  req.logout();
  res.json({
    message: 'Logout'
  });
};
//# sourceMappingURL=auth.js.map