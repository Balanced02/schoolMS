'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _ottoman = require('ottoman');

var _ottoman2 = _interopRequireDefault(_ottoman);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _couchbase = require('couchbase');

var _couchbase2 = _interopRequireDefault(_couchbase);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _ottoman_routes = require('./ottoman_routes');

var _ottoman_routes2 = _interopRequireDefault(_ottoman_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.disable('x-powered-by');
//mongodb://schoolms:schoolms@ds051630.mlab.com:51630/schoolms
//mongodb://localhost/schoolMSdev

// var bucket = (new Couchbase.Cluster("couchbase://localhost")).openBucket("example");
// Ottoman.store = new Ottoman.CbStoreAdapter(bucket, Couchbase);


_mongoose2.default.connect('mongodb://samie820:Agboworin_9254@ds117316.mlab.com:17316/schoolms', function (err) {
  if (err) {
    console.error(err);
    process.exit(1);
    return;
  }
  console.log('Database Connected Successfully!');
});

app.use((0, _morgan2.default)('dev', {
  skip: function skip() {
    return app.get('env') === 'test';
  }
}));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use((0, _morgan2.default)('dev'));

app.use(_express2.default.static(_path2.default.join(__dirname, '/public')));

// app.engine('html', require('ejs').renderFile)
// app.set('view engine', 'ejs')

// Routes
app.use('/', _routes2.default);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function (err, req, res, next) {
  // eslint-disable-line no-unused-vars
  res.status(err.status || 500).render('error', {
    error: err.status,
    message: err.message
  });
});

exports.default = app;
//# sourceMappingURL=app.js.map