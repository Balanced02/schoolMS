'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetUserCategory = exports.AddUserCategory = exports.GetLeaveCategory = exports.CategoryUpdate = exports.FetchDepartment = exports.NewDepartment = exports.LeaveUpdate = exports.GetLeave = exports.LeaveApplication = exports.UpdateClass = exports.AddClass = exports.AllClass = exports.GetTeachers = exports.GetVisitors = exports.VisitorData = exports.UpdateCourse = exports.CreateCourse = exports.SummaryData = exports.AllCourse = exports.CreateNotice = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _regeneratorRuntime = require('regenerator-runtime');

var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

var _Notice = require('../models/Notice');

var _Notice2 = _interopRequireDefault(_Notice);

var _Student = require('../models/Student');

var _Student2 = _interopRequireDefault(_Student);

var _Users = require('../models/Users');

var _Users2 = _interopRequireDefault(_Users);

var _Course = require('../models/Course');

var _Course2 = _interopRequireDefault(_Course);

var _Visitor = require('../models/Visitor');

var _Visitor2 = _interopRequireDefault(_Visitor);

var _Teacher = require('../models/Teacher');

var _Teacher2 = _interopRequireDefault(_Teacher);

var _ClassDetails = require('../models/ClassDetails');

var _ClassDetails2 = _interopRequireDefault(_ClassDetails);

var _Leave = require('../models/Leave');

var _Leave2 = _interopRequireDefault(_Leave);

var _Department = require('../models/Department');

var _Department2 = _interopRequireDefault(_Department);

var _LeaveCategory = require('../models/LeaveCategory');

var _LeaveCategory2 = _interopRequireDefault(_LeaveCategory);

var _UserCategory = require('../models/UserCategory');

var _UserCategory2 = _interopRequireDefault(_UserCategory);

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
              error: _context.t0.message
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
    var _ref5, _ref6, totalStudents, pendingReg, totalStaff, noticeBoard;

    return _regeneratorRuntime2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return Promise.all([_Student2.default.find().count(), _Student2.default.find({ accepted: true }).count(), _Users2.default.find().count(), _Notice2.default.find().sort('-created')]);

          case 3:
            _ref5 = _context2.sent;
            _ref6 = _slicedToArray(_ref5, 4);
            totalStudents = _ref6[0];
            pendingReg = _ref6[1];
            totalStaff = _ref6[2];
            noticeBoard = _ref6[3];
            return _context2.abrupt('return', res.json({
              totalStudents: totalStudents,
              pendingReg: pendingReg,
              totalStaff: totalStaff,
              noticeBoard: noticeBoard
            }));

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2['catch'](0);

            res.status(400).json({
              message: 'Error Loading Clients',
              error: _context2.t0.message
            });

          case 15:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 12]]);
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

var GetTeachers = exports.GetTeachers = function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee4(req, res) {
    var _ref11, _ref12, teachers, count, data;

    return _regeneratorRuntime2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return Promise.all([_Teacher2.default.find(), _Teacher2.default.find().count()]);

          case 3:
            _ref11 = _context4.sent;
            _ref12 = _slicedToArray(_ref11, 2);
            teachers = _ref12[0];
            count = _ref12[1];
            _context4.next = 9;
            return _ClassDetails2.default.find({}, 'teacher classTitle');

          case 9:
            data = _context4.sent;

            teachers = teachers.map(function (teacher) {
              var assignedClass = data.filter(function (d) {
                return teacher.fullName === d.teacher;
              }).map(function (a) {
                return a.classTitle;
              }).join(', ');
              teacher._doc.classInfo = assignedClass ? assignedClass : '';
              return teacher;
            });
            res.json({ teachers: teachers });
            _context4.next = 17;
            break;

          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4['catch'](0);

            res.status(500).json({
              message: 'Error Loading Teacher Details',
              error: _context4.t0.message
            });

          case 17:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 14]]);
  }));

  return function GetTeachers(_x7, _x8) {
    return _ref10.apply(this, arguments);
  };
}();

var AllClass = exports.AllClass = function AllClass(req, res) {
  _ClassDetails2.default.find().sort('classTitle').then(function (data) {
    res.json({
      data: data
    });
  }).catch(function (err) {
    res.status(500).json({
      message: 'Error fetching class information',
      error: err.message
    });
  });
};

var AddClass = exports.AddClass = function AddClass(req, res) {
  _ClassDetails2.default.create(_extends({}, req.body)).then(function (classInfo) {
    res.json(classInfo);
  }).catch(function (err) {
    res.status(500).json({
      message: 'Error Creating Class',
      error: err.message
    });
  });
};

var UpdateClass = exports.UpdateClass = function UpdateClass(req, res) {
  var _id = req.body._id;

  _ClassDetails2.default.findOneAndUpdate({ _id: _id }, {
    $set: _extends({}, req.body)
  }, {
    new: true
  }).then(function (classInfo) {
    res.json(classInfo);
  }).catch(function (err) {
    res.status(500).json({
      message: 'Error Updating Class',
      error: err.message
    });
  });
};

var LeaveApplication = exports.LeaveApplication = function LeaveApplication(req, res) {
  _Leave2.default.create(_extends({}, req.body)).then(function (leave) {
    res.json(leave);
  }).catch(function (err) {
    res.status(500).json({
      message: 'Error creating leave',
      error: err.message
    });
  });
};

var GetLeave = exports.GetLeave = function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee5(req, res) {
    var id, searchQuery, _ref14, _ref15, leaves, count, data;

    return _regeneratorRuntime2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            searchQuery = {};

            if (id !== 'admin') {
              searchQuery = {
                teacherId: req.user.sid
              };
            }

            _context5.prev = 3;
            _context5.next = 6;
            return Promise.all([_Leave2.default.find(searchQuery).sort('-status'), _Leave2.default.find(searchQuery).count()]);

          case 6:
            _ref14 = _context5.sent;
            _ref15 = _slicedToArray(_ref14, 2);
            leaves = _ref15[0];
            count = _ref15[1];
            _context5.next = 12;
            return _Teacher2.default.find({}, 'sid fullName');

          case 12:
            data = _context5.sent;

            leaves = leaves.map(function (leave) {
              var teacherName = data.filter(function (d) {
                return leave.teacherId === d.sid;
              })[0];
              leave._doc.teacherName = teacherName ? teacherName.fullName : '';
              return leave;
            });
            res.json(leaves);
            _context5.next = 21;
            break;

          case 17:
            _context5.prev = 17;
            _context5.t0 = _context5['catch'](3);

            console.log(_context5.t0);
            res.status(500).json({
              message: 'Error getting leaves',
              error: _context5.t0.message
            });

          case 21:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[3, 17]]);
  }));

  return function GetLeave(_x9, _x10) {
    return _ref13.apply(this, arguments);
  };
}();

var LeaveUpdate = exports.LeaveUpdate = function LeaveUpdate(req, res) {
  var _id = req.body._id;

  var edited = Date.now();
  _Leave2.default.findOneAndUpdate({ _id: _id }, {
    $set: _extends({}, req.body, {
      edited: edited
    })
  }, {
    new: true
  }).then(function (leave) {
    res.json(leave);
  }).catch(function (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error Updating Leave',
      error: err.message
    });
  });
};

var NewDepartment = exports.NewDepartment = function NewDepartment(req, res) {
  var _id = req.body._id;

  if (_id) {
    _Department2.default.findOneAndUpdate({ _id: _id }, {
      $set: _extends({}, req.body)
    }, {
      new: true
    }).then(function (dept) {
      res.json(dept);
    }).catch(function (err) {
      console.log(err);
      res.status(500).json({
        message: 'Error updating dept',
        error: err.message
      });
    });
  } else {
    _Department2.default.create(_extends({}, req.body)).then(function (dept) {
      res.json(dept);
    }).catch(function (err) {
      res.status(500).json({
        message: 'Error Creating Dept',
        error: err.message
      });
    });
  }
};

var FetchDepartment = exports.FetchDepartment = function FetchDepartment(req, res) {
  _Department2.default.find().then(function (dept) {
    return res.json(dept);
  }).catch(function (err) {
    res.status(500).json({
      message: 'Error Fetching Department',
      error: err.message
    });
  });
};

var CategoryUpdate = exports.CategoryUpdate = function CategoryUpdate(req, res) {
  console.log(req.body);
  var _id = req.body._id;

  if (_id) {
    _LeaveCategory2.default.findOneAndUpdate({ _id: _id }, {
      $set: _extends({}, req.body)
    }, {
      new: true
    }).then(function (leave) {
      res.json(leave);
    }).catch(function (err) {
      console.log(err);
      res.status(500).json({
        message: 'Error updating leave',
        error: err.message
      });
    });
  } else {
    _LeaveCategory2.default.create(_extends({}, req.body)).then(function (leave) {
      res.json(leave);
    }).catch(function (err) {
      console.log(err);
      res.status(500).json({
        message: 'Error Creating Leave',
        error: err.message
      });
    });
  }
};

var GetLeaveCategory = exports.GetLeaveCategory = function GetLeaveCategory(req, res) {
  _LeaveCategory2.default.find().then(function (leave) {
    return res.json(leave);
  }).catch(function (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error Fetching Department',
      error: err.message
    });
  });
};

var AddUserCategory = exports.AddUserCategory = function AddUserCategory(req, res) {
  console.log(req.body);
  var _id = req.body._id;

  if (_id) {
    _UserCategory2.default.findOneAndUpdate({ _id: _id }, {
      $set: _extends({}, req.body)
    }, {
      new: true
    }).then(function (data) {
      res.json(data);
    }).catch(function (err) {
      console.log(err);
      res.status(500).json({
        message: 'Error updating leave',
        error: err.message
      });
    });
  } else {
    _UserCategory2.default.create(_extends({}, req.body)).then(function (data) {
      res.json(data);
    }).catch(function (err) {
      console.log(err);
      res.status(500).json({
        message: 'Error Creating Leave',
        error: err.message
      });
    });
  }
};

var GetUserCategory = exports.GetUserCategory = function GetUserCategory(req, res) {
  _UserCategory2.default.find().then(function (data) {
    return res.json(data);
  }).catch(function (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error Fetching Department',
      error: err.message
    });
  });
};
//# sourceMappingURL=api.js.map