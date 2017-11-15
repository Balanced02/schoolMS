import regeneratorRuntime from 'regenerator-runtime';

import Dropbox from 'dropbox';
import multer from 'multer';
import crypto from 'crypto';
import fs from 'fs';
import http from 'http';

import Notice from '../models/Notice';
import Student from '../models/Student';
import Users from '../models/Users';
import Course from '../models/Course';
import Visitor from '../models/Visitor';
import Teacher from '../models/Teacher';
import ClassDetails from '../models/ClassDetails';
import Leave from '../models/Leave';
import Department from '../models/Department';
import LeaveCategory from '../models/LeaveCategory';
import UserCategory from '../models/UserCategory';
import PayHead from '../models/PayHead';
import School from '../models/School';
import { resolve } from 'url';

export const CreateNotice = (req, res) => {
  let { date, body } = req.body;
  Notice.create({
    date,
    body,
    schoolId: req.user.schoolId,
  })
    .then(notice => {
      res.json(notice);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error Loading Clients',
        error: err.message,
      });
    });
};

export const AllCourse = async (req, res) => {
  try {
    let [courses, count] = await Promise.all([
      Course.find({
        schoolId: req.user.schoolId,
      }).sort('date'),
      Course.find({
        schoolId: req.user.schoolId,
      }).count(),
    ]);
    return res.json({
      courses,
      count,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching courses',
      error: err.message,
    });
  }
};

export const SummaryData = async (req, res) => {
  console.log(req.user);
  try {
    let [totalStudents, pendingReg, totalStaff, noticeBoard] = await Promise.all([
      Student.find({ schoolId: req.user.schoolId }).count(),
      Student.find({ accepted: true, schoolId: req.user.schoolId }).count(),
      Users.find({ schoolId: req.user.schoolId }).count(),
      Notice.find({ schoolId: req.user.schoolId }).sort('-created'),
    ]);
    return res.json({
      totalStudents,
      pendingReg,
      totalStaff,
      noticeBoard,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Error Loading Clients',
      error: err.message,
    });
  }
};

export const CreateCourse = (req, res) => {
  let { courseName, courseCode, minAttendance, description } = req.body;
  Course.create({ courseName, courseCode, minAttendance, description, schoolId: req.user.schoolId })
    .then(course => {
      res.json(course);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error Creating Course',
        error: err.message,
      });
    });
};

export const UpdateCourse = (req, res) => {
  let { _id, courseName, courseCode, minAttendance, description } = req.body;
  Course.findOneAndUpdate(
    { _id },
    {
      $set: {
        ...req.body,
      },
    },
    {
      new: true,
    }
  )
    .then(course => {
      res.json(course);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error Updating Course',
        error: err.message,
      });
    });
};

export const VisitorData = (req, res) => {
  !req.body._id
    ? newVisitor({ ...req.body, schoolId: req.user.schoolId })
        .then(visitor => res.json(visitor))
        .catch(err => {
          res.status(500).json({
            message: 'Error Logging Visitor',
            error: err.message,
          });
        })
    : updateVisitor()
        .then(visitor => res.json(visitor))
        .catch(err => {
          res.status(500).json({
            message: 'Error Logging Visitor',
            error: err.message,
          });
        });
};

const newVisitor = data => {
  return new Promise((resolve, reject) => {
    Visitor.create({ ...data })
      .then(visitor => {
        resolve(visitor);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const updateVisitor = data => {
  let id = data._id;
  return new Promise((resolve, reject) => {
    Visitor.findOneAndUpdate(
      { id: data._id },
      {
        $set: {
          ...data,
        },
      },
      {
        new: true,
      }
    )
      .then(visitor => resolve(visitor))
      .catch(err => reject(err));
  });
};

export const GetVisitors = async (req, res) => {
  try {
    let [visitors, count] = await Promise.all([
      Visitor.find({ schoolId: req.user.schoolId })
        .sort('-timeIn')
        .limit(50),
      Visitor.find({ schoolId: req.user.schoolId }).count(),
    ]);
    return res.json({
      visitors,
      count,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching courses',
      error: err.message,
    });
  }
};

export const GetTeachers = async (req, res) => {
  try {
    let [teachers, count] = await Promise.all([
      Teacher.find({ schoolId: req.user.schoolId }),
      Teacher.find({ schoolId: req.user.schoolId }).count(),
    ]);
    let data = await ClassDetails.find({ schoolId: req.user.schoolId }, 'teacher classTitle');
    teachers = teachers.map(teacher => {
      let assignedClass = data
        .filter(d => teacher.fullName === d.teacher)
        .map(a => a.classTitle)
        .join(', ');
      teacher._doc.classInfo = assignedClass ? assignedClass : '';
      return teacher;
    });
    res.json({ teachers });
  } catch (err) {
    res.status(500).json({
      message: 'Error Loading Teacher Details',
      error: err.message,
    });
  }
};

export const AllClass = (req, res) => {
  ClassDetails.find({ schoolId: req.user.schoolId })
    .sort('classTitle')
    .then(data => {
      res.json({
        data,
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error fetching class information',
        error: err.message,
      });
    });
};

export const AddClass = (req, res) => {
  ClassDetails.create({ ...req.body, schoolId: req.user.schoolId })
    .then(classInfo => {
      res.json(classInfo);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error Creating Class',
        error: err.message,
      });
    });
};

export const UpdateClass = (req, res) => {
  let { _id } = req.body;
  ClassDetails.findOneAndUpdate(
    { _id },
    {
      $set: {
        ...req.body,
      },
    },
    {
      new: true,
    }
  )
    .then(classInfo => {
      res.json(classInfo);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error Updating Class',
        error: err.message,
      });
    });
};

export const LeaveApplication = (req, res) => {
  console.log(req.user.sid);
  Leave.create({ ...req.body, schoolId: req.user.schoolId, teacherId: req.user.sid })
    .then(leave => {
      // console.log(leave);
      res.json(leave);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Error creating leave',
        error: err.message,
      });
    });
};

export const GetLeave = async (req, res) => {
  let id = req.params.id;
  console.log(id);
  let searchQuery = { schoolId: req.user.schoolId };
  if (id !== 'admin') {
    searchQuery = {
      teacherId: id,
    };
  }
  try {
    let [leaves, count] = await Promise.all([
      Leave.find(searchQuery).sort('-status'),
      Leave.find(searchQuery).count(),
    ]);
    console.log(leaves);
    let data = await Teacher.find({ schoolId: req.user.schoolId }, 'sid fullName');
    leaves = leaves.map(leave => {
      let teacherName = data.filter(d => leave.teacherId === d.sid)[0];
      leave._doc.teacherName = teacherName ? teacherName.fullName : '';
      return leave;
    });
    res.json(leaves);
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      message: 'Error getting leaves',
      error: error.message,
    });
  }
};

export const LeaveUpdate = (req, res) => {
  let { _id } = req.body;
  let edited = Date.now();
  Leave.findOneAndUpdate(
    { _id },
    {
      $set: {
        ...req.body,
        edited,
      },
    },
    {
      new: true,
    }
  )
    .then(leave => {
      res.json(leave);
    })
    .catch(err => {
      // console.log(err);
      res.status(500).json({
        message: 'Error Updating Leave',
        error: err.message,
      });
    });
};

export const NewDepartment = (req, res) => {
  let { _id } = req.body;
  if (_id) {
    Department.findOneAndUpdate(
      { _id },
      {
        $set: {
          ...req.body,
        },
      },
      {
        new: true,
      }
    )
      .then(dept => {
        res.json(dept);
      })
      .catch(err => {
        // console.log(err);
        res.status(500).json({
          message: 'Error updating dept',
          error: err.message,
        });
      });
  } else {
    Department.create({
      ...req.body,
      schoolId: req.user.schoolId,
    })
      .then(dept => {
        res.json(dept);
      })
      .catch(err => {
        res.status(500).json({
          message: 'Error Creating Dept',
          error: err.message,
        });
      });
  }
};

export const FetchDepartment = (req, res) => {
  Department.find({ schoolId: req.user.schoolId })
    .then(dept => res.json(dept))
    .catch(err => {
      res.status(500).json({
        message: 'Error Fetching Department',
        error: err.message,
      });
    });
};

export const CategoryUpdate = (req, res) => {
  console.log(req.body);
  let { _id } = req.body;
  if (_id) {
    LeaveCategory.findOneAndUpdate(
      { _id },
      {
        $set: {
          ...req.body,
        },
      },
      {
        new: true,
      }
    )
      .then(leave => {
        res.json(leave);
      })
      .catch(err => {
        // console.log(err);
        res.status(500).json({
          message: 'Error updating leave',
          error: err.message,
        });
      });
  } else {
    LeaveCategory.create({
      ...req.body,
      schoolId: req.user.schoolId,
    })
      .then(leave => {
        res.json(leave);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          message: 'Error Creating Leave',
          error: err.message,
        });
      });
  }
};

export const GetLeaveCategory = (req, res) => {
  LeaveCategory.find({ schoolId: req.user.schoolId })
    .then(leave => res.json(leave))
    .catch(err => {
      // console.log(err);
      res.status(500).json({
        message: 'Error Fetching Department',
        error: err.message,
      });
    });
};

export const AddUserCategory = (req, res) => {
  // console.log(req.body);
  let { _id } = req.body;
  if (_id) {
    UserCategory.findOneAndUpdate(
      { _id },
      {
        $set: {
          ...req.body,
        },
      },
      {
        new: true,
      }
    )
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        // console.log(err);
        res.status(500).json({
          message: 'Error updating leave',
          error: err.message,
        });
      });
  } else {
    UserCategory.create({
      ...req.body,
      schoolId: req.user.schoolId,
    })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        // console.log(err);
        res.status(500).json({
          message: 'Error Creating Leave',
          error: err.message,
        });
      });
  }
};

export const GetUserCategory = (req, res) => {
  UserCategory.find({ schoolId: req.user.schoolId })
    .sort('userType')
    .then(data => res.json(data))
    .catch(err => {
      // console.log(err);
      res.status(500).json({
        message: 'Error Fetching Department',
        error: err.message,
      });
    });
};

export const AddPayHead = (req, res) => {
  // console.log(req.body);
  let { _id } = req.body;
  if (_id) {
    PayHead.findOneAndUpdate(
      { _id },
      {
        $set: {
          ...req.body,
        },
      },
      {
        new: true,
      }
    )
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        // console.log(err);
        res.status(500).json({
          message: 'Error updating PayHead',
          error: err.message,
        });
      });
  } else {
    PayHead.create({
      ...req.body,
      schoolId: req.user.schoolId,
    })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        // console.log(err);
        res.status(500).json({
          message: 'Error Creating Pay Head',
          error: err.message,
        });
      });
  }
};

export const GetPayHead = (req, res) => {
  PayHead.find({ schoolId: req.user.schoolId })
    .then(data => res.json(data))
    .catch(err => {
      // console.log(err);
      res.status(500).json({
        message: 'Error Fetching Pay Roll Details',
        error: err.message,
      });
    });
};

export const EditSchool = (req, res) => {
  // console.log(req.body);
  let { _id } = req.body;
  if (_id) {
    School.findOneAndUpdate(
      { _id },
      {
        $set: {
          ...req.body,
        },
      },
      {
        new: true,
      }
    )
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        // console.log(err);
        res.status(500).json({
          message: 'Error updating School',
          error: err.message,
        });
      });
  } else {
    res.status(500).json({
      message: 'Error updating School',
      error: err.message,
    });
  }
};

export const GetSchools = (req, res) => {
  School.find({ schoolId: req.user.schoolId })
    .then(data => res.json(data))
    .catch(err => {
      // console.log(err);
      res.status(500).json({
        message: 'Error Fetching School Details',
        error: err.message,
      });
    });
};

export const UploadFile = async (req, res) => {
  if (!req.file) {
    console.log('No file received');
    return res.send({
      success: false,
    });
  } else {
    console.log(req.file);
    return fs.readFile(
      req.file.path,
      await function(err, data) {
        if (err) console.log(err);
        console.log('reading!!!');
        http
          .createServer(function(req, res) {
            res.writeHead(200, { 'Content-Type': 'image/*' });
            res.end(data); // Send the file data to the browser.
          })
          .listen(8124);
        upload(data, req.file.filename)
          .then(response => {
            console.log(response.path_display);
            getImg(response.path_display)
              .then(data => {
                console.log(data);
                res.json({ response, data });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  message: 'Error Uploading Logo',
                  error: err.message,
                });
              });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              message: 'Error Uploading Logo',
              error: err.message,
            });
          });
      }
    );
  }
};

const dbx = new Dropbox({
  accessToken: 'k8Ho1ZfoarAAAAAAAAAACXwiV_26nZURhcclrTo2j0eR7NqFNDFre1K4Qr-6D5KE',
});

const upload = (data, path) => {
  console.log('Uploading!!!');
  return new Promise((resolve, reject) => {
    dbx
      .filesUpload({ autorename: true, path: '/logos/' + path + '.jpeg', contents: data })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const getImg = path => {
  return new Promise((resolve, reject) => {
    dbx
      .filesGetTemporaryLink({ path })
      .then(response => {
        // console.log(response.link);
        resolve(response.link);
      })
      .catch(error => {
        reject(error);
      });
  });
};
