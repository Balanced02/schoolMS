'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetVisitors = exports.VisitorData = exports.UpdateCourse = exports.CreateCourse = exports.SummaryData = exports.AllCourse = exports.CreateNotice = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _regeneratorRuntime = require('regenerator-runtime');

var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

var _Notice = require('../models/Notice');

var _Notice2 = _interopRequireDefault(_Notice);

var _Student = require('../models/Student');

var _Student2 = _interopRequireDefault(_Student);

var _Teacher = require('../models/Teacher');

var _Teacher2 = _interopRequireDefault(_Teacher);

var _Course = require('../models/Course');

var _Course2 = _interopRequireDefault(_Course);

var _Visitor = require('../models/Visitor');

var _Visitor2 = _interopRequireDefault(_Visitor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var CreateNotice = exports.CreateNotice = function CreateNotice(req, res) {
  var _req$body = req.body,
      date = _req$body.date,
      body = _req$body.body;

  _Notice2.default.create({
    date: date,
    body: body
  }).then(function (notice) {
    res.json(notice);
  }).catch(function (err) {
    res.status(500).json({
      message: 'Error Loading Clients',
      error: err.message
    });
  });
};

var AllCourse = exports.AllCourse = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee(req, res) {
    var _ref2, _ref3, courses, count;

    return _regeneratorRuntime2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return Promise.all([_Course2.default.find().sort('date'), _Course2.default.find().count()]);

          case 3:
            _ref2 = _context.sent;
            _ref3 = _slicedToArray(_ref2, 2);
            courses = _ref3[0];
            count = _ref3[1];
            return _context.abrupt('return', res.json({
              courses: courses,
              count: count
            }));

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](0);

            res.status(500).json({
              message: 'Error fetching courses',
              error: err.message
            });

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 10]]);
  }));

  return function AllCourse(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var SummaryData = exports.SummaryData = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee2(req, res) {
    var _ref5, _ref6, totalStudents, pendingReg, totalTeachers, noticeBoard;

    return _regeneratorRuntime2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log('Getting Summary');
            _context2.prev = 1;
            _context2.next = 4;
            return Promise.all([_Student2.default.find().count(), _Student2.default.find({ accepted: true }).count(), _Teacher2.default.find().count(), _Notice2.default.find().sort('date')]);

          case 4:
            _ref5 = _context2.sent;
            _ref6 = _slicedToArray(_ref5, 4);
            totalStudents = _ref6[0];
            pendingReg = _ref6[1];
            totalTeachers = _ref6[2];
            noticeBoard = _ref6[3];
            return _context2.abrupt('return', res.json({
              totalStudents: totalStudents,
              pendingReg: pendingReg,
              totalTeachers: totalTeachers,
              noticeBoard: noticeBoard
            }));

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2['catch'](1);

            res.status(400).json({
              message: 'Error Loading Clients',
              error: _context2.t0.message
            });

          case 16:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[1, 13]]);
  }));

  return function SummaryData(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();

var CreateCourse = exports.CreateCourse = function CreateCourse(req, res) {
  var _req$body2 = req.body,
      courseName = _req$body2.courseName,
      courseCode = _req$body2.courseCode,
      minAttendance = _req$body2.minAttendance,
      description = _req$body2.description;

  _Course2.default.create({ courseName: courseName, courseCode: courseCode, minAttendance: minAttendance, description: description }).then(function (course) {
    res.json(course);
  }).catch(function (err) {
    res.status(500).json({
      message: 'Error Creating Course',
      error: err.message
    });
  });
};

var UpdateCourse = exports.UpdateCourse = function UpdateCourse(req, res) {
  var _req$body3 = req.body,
      _id = _req$body3._id,
      courseName = _req$body3.courseName,
      courseCode = _req$body3.courseCode,
      minAttendance = _req$body3.minAttendance,
      description = _req$body3.description;

  _Course2.default.findOneAndUpdate({ _id: _id }, {
    $set: _extends({}, req.body)
  }, {
    new: true
  }).then(function (course) {
    res.json(course);
  }).catch(function (err) {
    res.status(500).json({
      message: 'Error Updating Course',
      error: err.message
    });
  });
};

var VisitorData = exports.VisitorData = function VisitorData(req, res) {
  !req.body._id ? newVisitor(req.body).then(function (visitor) {
    return res.json(visitor);
  }).catch(function (err) {
    res.status(500).json({
      message: 'Error Logging Visitor',
      error: err.message
    });
  }) : updateVisitor().then(function (visitor) {
    return res.json(visitor);
  }).catch(function (err) {
    res.status(500).json({
      message: 'Error Logging Visitor',
      error: err.message
    });
  });
};

var newVisitor = function newVisitor(data) {
  return new Promise(function (resolve, reject) {
    _Visitor2.default.create(_extends({}, data)).then(function (visitor) {
      resolve(visitor);
    }).catch(function (err) {
      reject(err);
    });
  });
};

var updateVisitor = function updateVisitor(data) {
  var id = data._id;
  return new Promise(function (resolve, reject) {
    _Visitor2.default.findOneAndUpdate({ id: data._id }, {
      $set: _extends({}, data)
    }, {
      new: true
    }).then(function (visitor) {
      return resolve(visitor);
    }).catch(function (err) {
      return reject(err);
    });
  });
};

var GetVisitors = exports.GetVisitors = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee3(req, res) {
    var _ref8, _ref9, visitors, count;

    return _regeneratorRuntime2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return Promise.all([_Visitor2.default.find().sort('-timeIn').limit(50), _Visitor2.default.find().count()]);

          case 3:
            _ref8 = _context3.sent;
            _ref9 = _slicedToArray(_ref8, 2);
            visitors = _ref9[0];
            count = _ref9[1];
            return _context3.abrupt('return', res.json({
              visitors: visitors,
              count: count
            }));

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3['catch'](0);

            res.status(500).json({
              message: 'Error fetching courses',
              error: err.message
            });

          case 13:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 10]]);
  }));

  return function GetVisitors(_x5, _x6) {
    return _ref7.apply(this, arguments);
  };
}();
//# sourceMappingURL=api.js.map