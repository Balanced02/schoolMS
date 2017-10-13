'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _connectMongo = require('connect-mongo');

var _connectMongo2 = _interopRequireDefault(_connectMongo);

var _Admin = require('./models/Admin');

var _Admin2 = _interopRequireDefault(_Admin);

var _auth = require('./controllers/auth');

var _api = require('./controllers/api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
var api = (0, _express.Router)();

var MongoStore = (0, _connectMongo2.default)(_expressSession2.default);
router.use((0, _cookieParser2.default)());
router.use((0, _expressSession2.default)({
  secret: process.env.SESSION_SECRET || 's3cret diz@6l3d',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 3.6e6 // 1 Hour session
  },
  store: new MongoStore({
    mongooseConnection: _mongoose2.default.connection
  })
}));

// PassportJS Setup
router.use(_passport2.default.initialize());
router.use(_passport2.default.session());

var LocalStrategy = _passportLocal2.default.Strategy;
_passport2.default.use(new LocalStrategy(_Admin2.default.authenticate()));
_passport2.default.serializeUser(_Admin2.default.serializeUser());
_passport2.default.deserializeUser(_Admin2.default.deserializeUser());

router.use(_express2.default.static(_path2.default.join(__dirname, '../client/build')));

router.use('/api', api);

// Auth
api.get('/me', _auth.AuthMe);
api.post('/auth/login', _passport2.default.authenticate('local'), _auth.Login);
api.post('/auth/register', _auth.Register);
api.get('/auth/logout', _auth.Logout);

// Auth Middleware
api.use(_auth.RedirectNoAuth);

//Queries
api.get('/getSummary', _api.SummaryData);
api.post('/createNotice', _api.CreateNotice);
api.post('/createCourse', _api.CreateCourse);
api.post('/updateCourse', _api.UpdateCourse);
api.get('/allCourse', _api.AllCourse);
api.post('/newVisitor', _api.VisitorData);
api.get('/allVisitors', _api.GetVisitors);

exports.default = router;
//# sourceMappingURL=routes.js.map