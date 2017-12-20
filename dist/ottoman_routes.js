'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = require('passport-local');

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _ottoman = require('ottoman');

var _ottoman2 = _interopRequireDefault(_ottoman);

var _connectMongo = require('connect-mongo');

var _connectMongo2 = _interopRequireDefault(_connectMongo);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _Users = require('./models/Users');

var _Users2 = _interopRequireDefault(_Users);

var _auth = require('./controllers/auth');

var _api = require('./controllers/api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var router = (0, _express.Router)();
var api = (0, _express.Router)();

var upload = (0, _multer2.default)({ dest: './public/logos' });

// PassportJS Setup
router.use(_passport2.default.initialize());
router.use(_passport2.default.session());

var LocalStrategy = _passportLocal2.default.Strategy;
_passport2.default.use(new LocalStrategy(_Users2.default.authenticate()));
_passport2.default.serializeUser(_Users2.default.serializeUser());
_passport2.default.deserializeUser(_Users2.default.deserializeUser());

router.use('/api', api);

router.use(_express2.default.static(_path2.default.join(__dirname, '../client/build')));

// Auth
api.get('/me', _auth.AuthMe);
api.post('/auth/login', _passport2.default.authenticate('local'), _auth.Login);
api.post('/auth/createSchool', _auth.CreateSchool);
api.post('/auth/register', _auth.Register);
api.get('/auth/logout', _auth.Logout);
//# sourceMappingURL=ottoman_routes.js.map