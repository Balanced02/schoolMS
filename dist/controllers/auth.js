'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logout = exports.RedirectNoAuth = exports.AuthMe = exports.Login = exports.CreateSchool = exports.Register = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _regeneratorRuntime = require('regenerator-runtime');

var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Register = exports.Register = function Register(req, res) {
  var type = req.body.userType;
  if (req.body.userType !== 'super') {
    userRegister(req.body, req.user).then(function (user) {
      if (user.userType) {
        createUser(type, _extends({}, req.body, { schoolId: req.user.schoolId }), user.sid).then(function (user) {
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
    }).catch(function (err) {
      console.log(err);
      return res.status(400).json({
        message: err.message
      });
    });
  } else {
    userRegister(req.body).then(function (user) {
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
};

var userRegister = function userRegister(body, user) {
  var type = body.userType;
  var id = user ? user.schoolId : 'super';
  console.log('Details: ' + id + 'type: ' + type);
  var newUser = new _Users2.default(_extends({}, body, {
    userType: body.userType === 'school' ? 'admin' : body.userType,
    schoolId: id
  }));

  return new Promise(function (resolve, reject) {
    _Users2.default.register(newUser, body.password, function (err, user) {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(user);
    });
  });
};

var CreateSchool = exports.CreateSchool = function CreateSchool(req, res) {
  var schoolId = req.body.shortCode + Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
  console.log('School Id: ' + schoolId);
  _School2.default.create(_extends({}, req.body, {
    schoolId: schoolId
  })).then(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee(data) {
      var adminObj, _ref2, _ref3, user, authn;

      return _regeneratorRuntime2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log(data);
              adminObj = {
                userType: 'admin',
                email: data.email,
                username: data.shortCode,
                phoneNumber: data.phoneNumber,
                fullName: data.schoolName,
                schoolId: data.schoolId,
                password: req.body.password,
                sid: data.sid
              };
              _context.prev = 2;
              _context.next = 5;
              return Promise.all([createUser('admin', adminObj, data.sid), userRegister(adminObj, adminObj)]);

            case 5:
              _ref2 = _context.sent;
              _ref3 = _slicedToArray(_ref2, 2);
              user = _ref3[0];
              authn = _ref3[1];
              return _context.abrupt('return', res.json({
                user: user,
                authn: authn
              }));

            case 12:
              _context.prev = 12;
              _context.t0 = _context['catch'](2);

              console.log(_context.t0);
              res.status(500).json({
                message: 'Error Registering User',
                error: _context.t0.message
              });

            case 16:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[2, 12]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }()).catch(function (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error Registering School',
      error: err.message
    });
  });
};

var createUser = function createUser(userType, body, id) {
  console.log('Creating: ' + id);
  var User = userType === 'teacher' ? _Teacher2.default : userType === 'student' ? _Student2.default : userType === 'admin' ? _Admin2.default : _Teacher2.default;
  return new Promise(function (resolve, reject) {
    User.create(_extends({}, body, { sid: id })).then(function (user) {
      console.log(user);
      resolve(user);
    }).catch(function (err) {
      console.log(err);
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