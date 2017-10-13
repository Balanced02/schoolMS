'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logout = exports.RedirectNoAuth = exports.AuthMe = exports.Login = exports.Register = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Admin = require('../models/Admin');

var _Admin2 = _interopRequireDefault(_Admin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Register = exports.Register = function Register(req, res) {
  var newUser = new _Admin2.default(_extends({}, req.body));
  console.log(req.body.username);
  // console.log(req.body.number);
  _Admin2.default.register(newUser, req.body.password, function (err, user) {
    if (err) {
      return res.status(400).json({
        message: err.message
      });
    }
    return res.json({
      message: 'Registered Successfully',
      user: _extends({}, user)
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
    return res.redirect('/admin');
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