'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadUserDetails = exports.GetUserDetails = exports.UpdateSchool = exports.GetLibraryCategory = exports.LibraryCategoryUpdate = exports.getImg = exports.UploadFile = exports.EditSchool = exports.GetPayHead = exports.AddPayHead = exports.GetUserCategory = exports.AddUserCategory = exports.GetLeaveCategory = exports.CategoryUpdate = exports.FetchDepartment = exports.NewDepartment = exports.LeaveUpdate = exports.GetLeave = exports.LeaveApplication = exports.UpdateClass = exports.DeleteStudentGatePass = exports.CreateStudentCategory = exports.CreateStudentGatePass = exports.AddClass = exports.AllClass = exports.GetTeachers = exports.GetVisitors = exports.VisitorData = exports.UpdateCourse = exports.CreateCourse = exports.SummaryData = exports.GetSchools = exports.GetStudentCategory = exports.GetStudentGatePass = exports.GetNotes = exports.AllCourse = exports.CreateNote = exports.CreateNotice = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _regeneratorRuntime = require('regenerator-runtime');

var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

var _dropbox = require('dropbox');

var _dropbox2 = _interopRequireDefault(_dropbox);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _Notice = require('../models/Notice');

var _Notice2 = _interopRequireDefault(_Notice);

var _Note = require('../models/Note');

var _Note2 = _interopRequireDefault(_Note);

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

var _Admin = require('../models/Admin');

var _Admin2 = _interopRequireDefault(_Admin);

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

var _PayHead = require('../models/PayHead');

var _PayHead2 = _interopRequireDefault(_PayHead);

var _School = require('../models/School');

var _School2 = _interopRequireDefault(_School);

var _LibraryCategory = require('../models/LibraryCategory');

var _LibraryCategory2 = _interopRequireDefault(_LibraryCategory);

var _studentGatePass = require('../models/studentGatePass');

var _studentGatePass2 = _interopRequireDefault(_studentGatePass);

var _StudentCategory = require('../models/StudentCategory');

var _StudentCategory2 = _interopRequireDefault(_StudentCategory);

var _url = require('url');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var CreateNotice = exports.CreateNotice = function CreateNotice(req, res) {
  var _req$body = req.body,
      date = _req$body.date,
      body = _req$body.body;

  _Notice2.default.create({
    date: date,
    body: body,
    schoolId: req.user.schoolId
  }).then(function (notice) {
    res.json(notice);
  }).catch(function (err) {
    res.status(500).json({
      message: 'Error Loading Clients',
      error: err.message
    });
  });
};

// For creating the notes component
var CreateNote = exports.CreateNote = function CreateNote(req, res) {
  var _req$body2 = req.body,
      date = _req$body2.date,
      body = _req$body2.body;

  _Note2.default.create({
    body: body,
    schoolId: req.user.schoolId
  }).then(function (note) {
    res.json(note);
  }).catch(function (err) {
    res.status(500).json({
      message: 'Error loading clients',
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
            return Promise.all([_Course2.default.find({
              schoolId: req.user.schoolId
            }).sort('date'), _Course2.default.find({
              schoolId: req.user.schoolId
            }).count()]);

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

var GetNotes = exports.GetNotes = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee2(req, res) {
    var _ref5, _ref6, notes, count;

    return _regeneratorRuntime2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return Promise.all([_Note2.default.find({
              schoolId: req.user.schoolId
            }).sort('created'), _Note2.default.find({
              schoolId: req.user.schoolId
            }).count()]);

          case 3:
            _ref5 = _context2.sent;
            _ref6 = _slicedToArray(_ref5, 2);
            notes = _ref6[0];
            count = _ref6[1];
            return _context2.abrupt('return', res.json({
              notes: notes,
              count: count
            }));

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2['catch'](0);

            console.log(_context2.t0);
            res.status(500).json({
              message: 'Error fetching Notes',
              error: _context2.t0.message
            });

          case 14:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 10]]);
  }));

  return function GetNotes(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();

// Get the list of all gate passes issued in a tabular format

var GetStudentGatePass = exports.GetStudentGatePass = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee3(req, res) {
    var _ref8, _ref9, studentGatePasses, count;

    return _regeneratorRuntime2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return Promise.all([_studentGatePass2.default.find({
              schoolId: req.user.schoolId
            }).sort('created'), _studentGatePass2.default.find({
              schoolId: req.user.schoolId
            }).count()]);

          case 3:
            _ref8 = _context3.sent;
            _ref9 = _slicedToArray(_ref8, 2);
            studentGatePasses = _ref9[0];
            count = _ref9[1];
            return _context3.abrupt('return', res.json({
              studentGatePasses: studentGatePasses,
              count: count
            }));

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3['catch'](0);

            console.log(_context3.t0);
            res.status(500).json({
              message: 'Error fetching Gate Pass',
              error: _context3.t0.message
            });

          case 14:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 10]]);
  }));

  return function GetStudentGatePass(_x5, _x6) {
    return _ref7.apply(this, arguments);
  };
}();

// Get a list of all the student Categories
var GetStudentCategory = exports.GetStudentCategory = function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee4(req, res) {
    var _ref11, _ref12, count, categories;

    return _regeneratorRuntime2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return Promise.all([_StudentCategory2.default.find().count(), _StudentCategory2.default.find().sort('created').limit(25)]);

          case 3:
            _ref11 = _context4.sent;
            _ref12 = _slicedToArray(_ref11, 2);
            count = _ref12[0];
            categories = _ref12[1];
            return _context4.abrupt('return', res.json({
              count: count,
              categories: categories
            }));

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4['catch'](0);

            res.status(500).json({
              message: 'Error getting categories',
              error: _context4.t0.message
            });

          case 13:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 10]]);
  }));

  return function GetStudentCategory(_x7, _x8) {
    return _ref10.apply(this, arguments);
  };
}();

var GetSchools = exports.GetSchools = function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee5(req, res) {
    var _ref14, _ref15, count, schools;

    return _regeneratorRuntime2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return Promise.all([_School2.default.find().count(), _School2.default.find().sort('-created').limit(25)]);

          case 3:
            _ref14 = _context5.sent;
            _ref15 = _slicedToArray(_ref14, 2);
            count = _ref15[0];
            schools = _ref15[1];
            return _context5.abrupt('return', res.json({
              count: count,
              schools: schools
            }));

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5['catch'](0);

            res.status(500).json({
              message: 'Error Loading Schools',
              error: _context5.t0.message
            });

          case 13:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 10]]);
  }));

  return function GetSchools(_x9, _x10) {
    return _ref13.apply(this, arguments);
  };
}();

var SummaryData = exports.SummaryData = function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee6(req, res) {
    var _ref17, _ref18, totalStudents, pendingReg, totalStaff, noticeBoard, notes;

    return _regeneratorRuntime2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return Promise.all([_Student2.default.find({ schoolId: req.user.schoolId }).count(), _Student2.default.find({ accepted: true, schoolId: req.user.schoolId }).count(), _Users2.default.find({ schoolId: req.user.schoolId }).count(), _Notice2.default.find({ schoolId: req.user.schoolId }).sort('-created'), _Note2.default.find({ schoolId: req.user.schoolId }).sort('-created')]);

          case 3:
            _ref17 = _context6.sent;
            _ref18 = _slicedToArray(_ref17, 5);
            totalStudents = _ref18[0];
            pendingReg = _ref18[1];
            totalStaff = _ref18[2];
            noticeBoard = _ref18[3];
            notes = _ref18[4];
            return _context6.abrupt('return', res.json({
              totalStudents: totalStudents,
              pendingReg: pendingReg,
              totalStaff: totalStaff,
              noticeBoard: noticeBoard,
              notes: notes
            }));

          case 13:
            _context6.prev = 13;
            _context6.t0 = _context6['catch'](0);

            res.status(400).json({
              message: 'Error Loading Clients',
              error: _context6.t0.message
            });

          case 16:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[0, 13]]);
  }));

  return function SummaryData(_x11, _x12) {
    return _ref16.apply(this, arguments);
  };
}();

var CreateCourse = exports.CreateCourse = function CreateCourse(req, res) {
  var _req$body3 = req.body,
      courseName = _req$body3.courseName,
      courseCode = _req$body3.courseCode,
      minAttendance = _req$body3.minAttendance,
      description = _req$body3.description;

  _Course2.default.create({ courseName: courseName, courseCode: courseCode, minAttendance: minAttendance, description: description, schoolId: req.user.schoolId }).then(function (course) {
    res.json(course);
  }).catch(function (err) {
    res.status(500).json({
      message: 'Error Creating Course',
      error: err.message
    });
  });
};

var UpdateCourse = exports.UpdateCourse = function UpdateCourse(req, res) {
  var _req$body4 = req.body,
      _id = _req$body4._id,
      courseName = _req$body4.courseName,
      courseCode = _req$body4.courseCode,
      minAttendance = _req$body4.minAttendance,
      description = _req$body4.description;

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
  !req.body._id ? newVisitor(_extends({}, req.body, { schoolId: req.user.schoolId })).then(function (visitor) {
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
  var _ref19 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee7(req, res) {
    var _ref20, _ref21, visitors, count;

    return _regeneratorRuntime2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return Promise.all([_Visitor2.default.find({ schoolId: req.user.schoolId }).sort('-timeIn').limit(50), _Visitor2.default.find({ schoolId: req.user.schoolId }).count()]);

          case 3:
            _ref20 = _context7.sent;
            _ref21 = _slicedToArray(_ref20, 2);
            visitors = _ref21[0];
            count = _ref21[1];
            return _context7.abrupt('return', res.json({
              visitors: visitors,
              count: count
            }));

          case 10:
            _context7.prev = 10;
            _context7.t0 = _context7['catch'](0);

            res.status(500).json({
              message: 'Error fetching courses',
              error: err.message
            });

          case 13:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[0, 10]]);
  }));

  return function GetVisitors(_x13, _x14) {
    return _ref19.apply(this, arguments);
  };
}();

var GetTeachers = exports.GetTeachers = function () {
  var _ref22 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee8(req, res) {
    var _ref23, _ref24, teachers, count, data;

    return _regeneratorRuntime2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return Promise.all([_Teacher2.default.find({ schoolId: req.user.schoolId }), _Teacher2.default.find({ schoolId: req.user.schoolId }).count()]);

          case 3:
            _ref23 = _context8.sent;
            _ref24 = _slicedToArray(_ref23, 2);
            teachers = _ref24[0];
            count = _ref24[1];
            _context8.next = 9;
            return _ClassDetails2.default.find({ schoolId: req.user.schoolId }, 'teacher classTitle');

          case 9:
            data = _context8.sent;

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
            _context8.next = 17;
            break;

          case 14:
            _context8.prev = 14;
            _context8.t0 = _context8['catch'](0);

            res.status(500).json({
              message: 'Error Loading Teacher Details',
              error: _context8.t0.message
            });

          case 17:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined, [[0, 14]]);
  }));

  return function GetTeachers(_x15, _x16) {
    return _ref22.apply(this, arguments);
  };
}();

var AllClass = exports.AllClass = function AllClass(req, res) {
  _ClassDetails2.default.find({ schoolId: req.user.schoolId }).sort('classTitle').then(function (data) {
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
  _ClassDetails2.default.create(_extends({}, req.body, { schoolId: req.user.schoolId })).then(function (classInfo) {
    res.json(classInfo);
  }).catch(function (err) {
    res.status(500).json({
      message: 'Error Creating Class',
      error: err.message
    });
  });
};

// Creating the gate pass function , mimicing the create course function

var CreateStudentGatePass = exports.CreateStudentGatePass = function CreateStudentGatePass(req, res) {
  var _req$body5 = req.body,
      studentName = _req$body5.studentName,
      contactNumber = _req$body5.contactNumber,
      personName = _req$body5.personName,
      issueDate = _req$body5.issueDate,
      reason = _req$body5.reason,
      employeeName = _req$body5.employeeName;

  _studentGatePass2.default.create({ studentName: studentName, contactNumber: contactNumber, personName: personName, issueDate: issueDate, reason: reason, employeeName: employeeName, schoolId: req.user.schoolId }).then(function (studentGatePass) {
    res.json(studentGatePass);
  }).catch(function (err) {
    res.status(500).json({
      message: 'Error Creating Gate Pass',
      error: err.message
    });
  });
};

//Create the Student Category

var CreateStudentCategory = exports.CreateStudentCategory = function CreateStudentCategory(req, res) {
  var category = req.body.category;

  _StudentCategory2.default.create({ category: category, schoolId: req.user.schoolId }).then(function (StudentCategory) {
    res.json(StudentCategory);
  }).catch(function (err) {
    res.status(500).json({

      message: 'Error creating Student Catgory',
      error: err.message

    });
  });
};

// Function to delete the Students Gate Pass

var DeleteStudentGatePass = exports.DeleteStudentGatePass = function DeleteStudentGatePass(req, res) {
  var gatePassID = req.body.gatePassID;

  _studentGatePass2.default.findOneAndRemove({ gatePassID: gatePassID }).catch(function (err) {
    //if there is any error deleting the data
    res.status(500).json({
      message: 'Unable to delete the Pass',
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
  _Leave2.default.create(_extends({}, req.body, { schoolId: req.user.schoolId, teacherId: req.user.sid })).then(function (leave) {
    res.json(leave);
  }).catch(function (err) {
    res.status(500).json({
      message: 'Error creating leave',
      error: err.message
    });
  });
};

var GetLeave = exports.GetLeave = function () {
  var _ref25 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee9(req, res) {
    var id, searchQuery, _ref26, _ref27, leaves, count, data;

    return _regeneratorRuntime2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            id = req.params.id;
            searchQuery = { schoolId: req.user.schoolId };

            if (id !== 'admin') {
              searchQuery = {
                teacherId: id
              };
            }
            _context9.prev = 3;
            _context9.next = 6;
            return Promise.all([_Leave2.default.find(searchQuery).sort('-status'), _Leave2.default.find(searchQuery).count()]);

          case 6:
            _ref26 = _context9.sent;
            _ref27 = _slicedToArray(_ref26, 2);
            leaves = _ref27[0];
            count = _ref27[1];
            _context9.next = 12;
            return _Teacher2.default.find({ schoolId: req.user.schoolId }, 'sid fullName');

          case 12:
            data = _context9.sent;

            leaves = leaves.map(function (leave) {
              var teacherName = data.filter(function (d) {
                return leave.teacherId === d.sid;
              })[0];
              leave._doc.teacherName = teacherName ? teacherName.fullName : '';
              return leave;
            });
            res.json(leaves);
            _context9.next = 20;
            break;

          case 17:
            _context9.prev = 17;
            _context9.t0 = _context9['catch'](3);

            res.status(500).json({
              message: 'Error getting leaves',
              error: _context9.t0.message
            });

          case 20:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined, [[3, 17]]);
  }));

  return function GetLeave(_x17, _x18) {
    return _ref25.apply(this, arguments);
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
      res.status(500).json({
        message: 'Error updating dept',
        error: err.message
      });
    });
  } else {
    _Department2.default.create(_extends({}, req.body, {
      schoolId: req.user.schoolId
    })).then(function (dept) {
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
  _Department2.default.find({ schoolId: req.user.schoolId }).then(function (dept) {
    return res.json(dept);
  }).catch(function (err) {
    res.status(500).json({
      message: 'Error Fetching Department',
      error: err.message
    });
  });
};

var CategoryUpdate = exports.CategoryUpdate = function CategoryUpdate(req, res) {
  var _id = req.body._id;

  if (_id) {
    _LeaveCategory2.default.findOneAndUpdate({ _id: _id }, {
      $set: _extends({}, req.body)
    }, {
      new: true
    }).then(function (leave) {
      res.json(leave);
    }).catch(function (err) {
      res.status(500).json({
        message: 'Error updating leave',
        error: err.message
      });
    });
  } else {
    _LeaveCategory2.default.create(_extends({}, req.body, {
      schoolId: req.user.schoolId
    })).then(function (leave) {
      res.json(leave);
    }).catch(function (err) {
      res.status(500).json({
        message: 'Error Creating Leave',
        error: err.message
      });
    });
  }
};

var GetLeaveCategory = exports.GetLeaveCategory = function GetLeaveCategory(req, res) {
  _LeaveCategory2.default.find({ schoolId: req.user.schoolId }).then(function (leave) {
    return res.json(leave);
  }).catch(function (err) {
    res.status(500).json({
      message: 'Error Fetching Department',
      error: err.message
    });
  });
};

var AddUserCategory = exports.AddUserCategory = function AddUserCategory(req, res) {
  var _id = req.body._id;

  if (_id) {
    _UserCategory2.default.findOneAndUpdate({ _id: _id }, {
      $set: _extends({}, req.body)
    }, {
      new: true
    }).then(function (data) {
      res.json(data);
    }).catch(function (err) {
      res.status(500).json({
        message: 'Error updating leave',
        error: err.message
      });
    });
  } else {
    _UserCategory2.default.create(_extends({}, req.body, {
      schoolId: req.user.schoolId
    })).then(function (data) {
      res.json(data);
    }).catch(function (err) {
      res.status(500).json({
        message: 'Error Creating Leave',
        error: err.message
      });
    });
  }
};

var GetUserCategory = exports.GetUserCategory = function GetUserCategory(req, res) {
  _UserCategory2.default.find({ schoolId: req.user.schoolId }).sort('userType').then(function (data) {
    return res.json(data);
  }).catch(function (err) {
    res.status(500).json({
      message: 'Error Fetching Department',
      error: err.message
    });
  });
};

var AddPayHead = exports.AddPayHead = function AddPayHead(req, res) {
  var _id = req.body._id;

  if (_id) {
    _PayHead2.default.findOneAndUpdate({ _id: _id }, {
      $set: _extends({}, req.body)
    }, {
      new: true
    }).then(function (data) {
      res.json(data);
    }).catch(function (err) {
      res.status(500).json({
        message: 'Error updating PayHead',
        error: err.message
      });
    });
  } else {
    _PayHead2.default.create(_extends({}, req.body, {
      schoolId: req.user.schoolId
    })).then(function (data) {
      res.json(data);
    }).catch(function (err) {
      res.status(500).json({
        message: 'Error Creating Pay Head',
        error: err.message
      });
    });
  }
};

var GetPayHead = exports.GetPayHead = function GetPayHead(req, res) {
  _PayHead2.default.find({ schoolId: req.user.schoolId }).then(function (data) {
    return res.json(data);
  }).catch(function (err) {
    res.status(500).json({
      message: 'Error Fetching Pay Roll Details',
      error: err.message
    });
  });
};

var EditSchool = exports.EditSchool = function EditSchool(req, res) {
  var _id = req.body._id;

  if (_id) {
    _School2.default.findOneAndUpdate({ _id: _id }, {
      $set: _extends({}, req.body)
    }, {
      new: true
    }).then(function (data) {
      res.json(data);
    }).catch(function (err) {
      res.status(500).json({
        message: 'Error updating School',
        error: err.message
      });
    });
  } else {
    res.status(500).json({
      message: 'Error updating School',
      error: err.message
    });
  }
};

var UploadFile = exports.UploadFile = function () {
  var _ref28 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee10(req, res) {
    return _regeneratorRuntime2.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            if (req.file) {
              _context10.next = 4;
              break;
            }

            return _context10.abrupt('return', res.send({
              success: false
            }));

          case 4:
            _context10.t0 = _fs2.default;
            _context10.t1 = req.file.path;
            _context10.next = 8;
            return function (err, data) {
              _http2.default.createServer(function (req, res) {
                res.writeHead(200, { 'Content-Type': 'image/*' });
                res.end(data); // Send the file data to the browser.
              }).listen(8124);
              upload(data, req.file.filename).then(function (response) {
                getImg(response.path_display).then(function (data) {
                  res.json({ response: response, data: data });
                }).catch(function (err) {
                  res.status(500).json({
                    message: 'Error Uploading Logo',
                    error: err.message
                  });
                });
              }).catch(function (err) {
                res.status(500).json({
                  message: 'Error Uploading Logo',
                  error: err.message
                });
              });
            };

          case 8:
            _context10.t2 = _context10.sent;
            return _context10.abrupt('return', _context10.t0.readFile.call(_context10.t0, _context10.t1, _context10.t2));

          case 10:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  }));

  return function UploadFile(_x19, _x20) {
    return _ref28.apply(this, arguments);
  };
}();

var dbx = new _dropbox2.default({
  accessToken: 'k8Ho1ZfoarAAAAAAAAAACXwiV_26nZURhcclrTo2j0eR7NqFNDFre1K4Qr-6D5KE'
});

var upload = function upload(data, path) {
  return new Promise(function (resolve, reject) {
    dbx.filesUpload({ autorename: true, path: '/logos/' + path + '.jpeg', contents: data }).then(function (response) {
      resolve(response);
    }).catch(function (error) {
      reject(error);
    });
  });
};

var getImg = exports.getImg = function getImg(path) {
  return new Promise(function (resolve, reject) {
    dbx.filesGetTemporaryLink({ path: path }).then(function (response) {
      resolve(response.link);
    }).catch(function (error) {
      reject(error);
    });
  });
};

var LibraryCategoryUpdate = exports.LibraryCategoryUpdate = function LibraryCategoryUpdate(req, res) {
  var _id = req.body._id;

  if (_id) {
    _LibraryCategory2.default.findOneAndUpdate({ _id: _id }, {
      $set: _extends({}, req.body)
    }, {
      new: true
    }).then(function (data) {
      res.json(data);
    }).catch(function (err) {
      res.status(500).json({
        message: 'Error updating',
        error: err.message
      });
    });
  } else {
    _LibraryCategory2.default.create(_extends({}, req.body, {
      schoolId: req.user.schoolId
    })).then(function (data) {
      res.json(data);
    }).catch(function (err) {
      res.status(500).json({
        message: 'Error Creating',
        error: err.message
      });
    });
  }
};

var GetLibraryCategory = exports.GetLibraryCategory = function GetLibraryCategory(req, res) {
  _LibraryCategory2.default.find({ schoolId: req.user.schoolId }).then(function (data) {
    return res.json(data);
  }).catch(function (err) {
    res.status(500).json({
      message: 'Error Fetching Department',
      error: err.message
    });
  });
};

var UpdateSchool = exports.UpdateSchool = function UpdateSchool(req, res) {
  var _id = req.body._id;

  _School2.default.findOneAndUpdate({ _id: _id }, {
    $set: _extends({}, req.body)
  }, {
    new: true
  }).then(function (school) {
    res.json(school);
  }).catch(function (err) {
    res.status(500).json({
      message: 'Error Updating Course',
      error: err.message
    });
  });
};

var GetUserDetails = exports.GetUserDetails = function () {
  var _ref29 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee11(req, res) {
    var userType, id, User, _ref30, _ref31, userData, schoolData;

    return _regeneratorRuntime2.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            userType = req.body.userType;
            id = req.body.sid;
            _context11.prev = 2;

            console.log('Getting User details of ' + userType + id);
            User = userType === 'teacher' ? _Teacher2.default : userType === 'student' ? _Student2.default : userType === 'admin' ? _Admin2.default : _Teacher2.default;
            _context11.next = 7;
            return Promise.all([User.findOne({
              sid: id
            }), _School2.default.findOne({
              schoolId: req.user.schoolId
            })]);

          case 7:
            _ref30 = _context11.sent;
            _ref31 = _slicedToArray(_ref30, 2);
            userData = _ref31[0];
            schoolData = _ref31[1];
            return _context11.abrupt('return', res.json({
              userData: userData,
              schoolData: schoolData
            }));

          case 14:
            _context11.prev = 14;
            _context11.t0 = _context11['catch'](2);

            res.status(500).json({
              message: 'Error fetching details',
              error: _context11.t0.message
            });

          case 17:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined, [[2, 14]]);
  }));

  return function GetUserDetails(_x21, _x22) {
    return _ref29.apply(this, arguments);
  };
}();

var UploadUserDetails = exports.UploadUserDetails = function () {
  var _ref32 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee12(req, res) {
    var userType, id, User, _ref33, _ref34, userData, schoolData;

    return _regeneratorRuntime2.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            userType = req.body.userType;
            id = req.body.sid;
            _context12.prev = 2;

            console.log('Getting User details of ' + userType + id);
            User = userType === 'teacher' ? _Teacher2.default : userType === 'student' ? _Student2.default : userType === 'admin' ? _Admin2.default : _Teacher2.default;
            _context12.next = 7;
            return Promise.all([User.findOneAndUpdate({
              sid: id
            }, {
              $set: _extends({}, req.body)
            }, {
              new: true
            }), _School2.default.findOne({
              schoolId: req.user.schoolId
            })]);

          case 7:
            _ref33 = _context12.sent;
            _ref34 = _slicedToArray(_ref33, 2);
            userData = _ref34[0];
            schoolData = _ref34[1];
            return _context12.abrupt('return', res.json({
              userData: userData,
              schoolData: schoolData
            }));

          case 14:
            _context12.prev = 14;
            _context12.t0 = _context12['catch'](2);

            res.status(500).json({
              message: 'Error Updating User details',
              error: _context12.t0.message
            });

          case 17:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, undefined, [[2, 14]]);
  }));

  return function UploadUserDetails(_x23, _x24) {
    return _ref32.apply(this, arguments);
  };
}();
//# sourceMappingURL=api.js.map