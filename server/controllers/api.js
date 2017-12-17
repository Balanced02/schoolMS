import regeneratorRuntime from 'regenerator-runtime';

import Dropbox from 'dropbox';
import multer from 'multer';
import crypto from 'crypto';
import fs from 'fs';
import http from 'http';

import Notice from '../models/Notice';
import Note from '../models/Note';
import Student from '../models/Student';
import Users from '../models/Users';
import Course from '../models/Course';
import Visitor from '../models/Visitor';
import Teacher from '../models/Teacher';
import Admin from '../models/Admin';
import ClassDetails from '../models/ClassDetails';
import Leave from '../models/Leave';
import Department from '../models/Department';
import LeaveCategory from '../models/LeaveCategory';
import UserCategory from '../models/UserCategory';
import PayHead from '../models/PayHead';
import School from '../models/School';
import LibraryCategory from '../models/LibraryCategory';
import studentGatePass from '../models/studentGatePass';
import StudentCategory from '../models/StudentCategory';
import AcademicDetails from '../models/AcademicDetails';

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

// For creating the notes component
export const CreateNote = (req, res) => {
  let { date, body } = req.body;
  Note.create({
    body,
    schoolId: req.user.schoolId,
  })
    .then(note => {
      res.json(note);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error loading clients',
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

export const GetNotes = async (req, res) => {
  try {
    let [notes, count] = await Promise.all([
      Note.find({
        schoolId: req.user.schoolId,
      }).sort('created'),
      Note.find({
        schoolId: req.user.schoolId,
      }).count(),
    ]);
    return res.json({
      notes,
      count,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error fetching Notes',
      error: err.message,
    });
  }
};

// Get the list of all gate passes issued in a tabular format

export const GetStudentGatePass = async (req, res) => {
  try {
    let [studentGatePasses, count] = await Promise.all([
      studentGatePass
        .find({
          schoolId: req.user.schoolId,
        })
        .sort('created'),
      studentGatePass
        .find({
          schoolId: req.user.schoolId,
        })
        .count(),
    ]);
    let staffNames = await Users.find(
      {
        sid: {
          $in: studentGatePasses.map(s => s.staffId),
        },
      },
      'username sid'
    );
    studentGatePasses = studentGatePasses.map(gatePass => {
      let staffName = staffNames.filter(staff => staff.sid === gatePass.sid)[0];
      gatePass._doc.employeeName = staffName ? staffName.username : 'Admin';
      return gatePass;
    });
    return res.json({
      studentGatePasses,
      count,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error fetching Gate Pass',
      error: err.message,
    });
  }
};

// Get a list of all the student Categories
export const GetStudentCategory = async (req, res) => {
  try {
    let [count, categories] = await Promise.all([
      StudentCategory.find().count(),
      StudentCategory.find()
        .sort('created')
        .limit(25),
    ]);
    return res.json({
      count,
      categories,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error getting categories',
      error: err.message,
    });
  }
};

export const GetSchools = async (req, res) => {
  try {
    let [count, schools] = await Promise.all([
      School.find().count(),
      School.find()
        .sort('-created')
        .limit(25),
    ]);
    return res.json({
      count,
      schools,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error Loading Schools',
      error: err.message,
    });
  }
};

export const SummaryData = async (req, res) => {
  try {
    let [totalStudents, pendingReg, totalStaff, noticeBoard, notes] = await Promise.all([
      Student.find({ schoolId: req.user.schoolId }).count(),
      Student.find({ accepted: true, schoolId: req.user.schoolId }).count(),
      Users.find({ schoolId: req.user.schoolId }).count(),
      Notice.find({ schoolId: req.user.schoolId }).sort('-created'),
      Note.find({ schoolId: req.user.schoolId }).sort('-created'),
    ]);
    return res.json({
      totalStudents,
      pendingReg,
      totalStaff,
      noticeBoard,
      notes,
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
  Course.create({
    courseName,
    courseCode,
    minAttendance,
    description,
    schoolId: req.user.schoolId,
  })
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

// Creating the gate pass function , mimicing the create course function

export const CreateStudentGatePass = (req, res) => {
  console.log(req.user);
  studentGatePass
    .create({
      ...req.body,
      schoolId: req.user.schoolId,
      staffId: req.user.sid,
    })
    .then(studentGatePass => {
      res.json(studentGatePass);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error Creating Gate Pass',
        error: err.message,
      });
    });
};

//Create the Student Category
export const CreateStudentCategory = (req, res) => {
  let { category } = req.body;
  StudentCategory.create({ category, schoolId: req.user.schoolId })
    .then(StudentCategory => {
      res.json(StudentCategory);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error creating Student Catgory',
        error: err.message,
      });
    });
};

// Function to delete the Students Gate Pass

export const DeleteStudentGatePass = (req, res) => {
  let { gatePassID } = req.body;
  studentGatePass.findOneAndRemove({ gatePassID }).catch(err => {
    //if there is any error deleting the data
    res.status(500).json({
      message: 'Unable to delete the Pass',
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
  Leave.create({
    ...req.body,
    schoolId: req.user.schoolId,
    teacherId: req.user.sid,
  })
    .then(leave => {
      res.json(leave);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error creating leave',
        error: err.message,
      });
    });
};

export const GetLeave = async (req, res) => {
  let id = req.params.id;

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

    let data = await Teacher.find({ schoolId: req.user.schoolId }, 'sid fullName');
    leaves = leaves.map(leave => {
      let teacherName = data.filter(d => leave.teacherId === d.sid)[0];
      leave._doc.teacherName = teacherName ? teacherName.fullName : '';
      return leave;
    });
    res.json(leaves);
  } catch (error) {
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
      res.status(500).json({
        message: 'Error Fetching Department',
        error: err.message,
      });
    });
};

export const AddUserCategory = (req, res) => {
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
      res.status(500).json({
        message: 'Error Fetching Department',
        error: err.message,
      });
    });
};

export const AddPayHead = (req, res) => {
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
      res.status(500).json({
        message: 'Error Fetching Pay Roll Details',
        error: err.message,
      });
    });
};

export const EditSchool = (req, res) => {
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

export const UploadFile = async (req, res) => {
  if (!req.file) {
    return res.send({
      success: false,
    });
  } else {
    return fs.readFile(
      req.file.path,
      await function(err, data) {
        http
          .createServer(function(req, res) {
            res.writeHead(200, { 'Content-Type': 'image/*' });
            res.end(data); // Send the file data to the browser.
          })
          .listen(8124);
        upload(data, req.file.filename)
          .then(response => {
            getImg(response.path_display)
              .then(data => {
                res.json({ response, data });
              })
              .catch(err => {
                res.status(500).json({
                  message: 'Error Uploading Logo',
                  error: err.message,
                });
              });
          })
          .catch(err => {
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
  return new Promise((resolve, reject) => {
    dbx
      .filesUpload({
        autorename: true,
        path: '/logos/' + path + '.jpeg',
        contents: data,
      })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const getImg = path => {
  return new Promise((resolve, reject) => {
    dbx
      .filesGetTemporaryLink({ path })
      .then(response => {
        resolve(response.link);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const LibraryCategoryUpdate = (req, res) => {
  let { _id } = req.body;
  if (_id) {
    LibraryCategory.findOneAndUpdate(
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
        res.status(500).json({
          message: 'Error updating',
          error: err.message,
        });
      });
  } else {
    LibraryCategory.create({
      ...req.body,
      schoolId: req.user.schoolId,
    })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).json({
          message: 'Error Creating',
          error: err.message,
        });
      });
  }
};

export const GetLibraryCategory = (req, res) => {
  LibraryCategory.find({ schoolId: req.user.schoolId })
    .then(data => res.json(data))
    .catch(err => {
      res.status(500).json({
        message: 'Error Fetching Department',
        error: err.message,
      });
    });
};

export const UpdateSchool = (req, res) => {
  let { _id } = req.body;
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
    .then(school => {
      res.json(school);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error Updating Course',
        error: err.message,
      });
    });
};

export const GetUserDetails = async (req, res) => {
  let userType = req.body.userType;
  let id = req.body.sid;

  try {
    console.log('Getting User details of ' + userType + id);
    let User =
      userType === 'teacher'
        ? Teacher
        : userType === 'student' ? Student : userType === 'admin' ? Admin : Teacher;
    let [userData, schoolData] = await Promise.all([
      User.findOne({
        sid: id,
      }),
      School.findOne({
        schoolId: req.user.schoolId,
      }),
    ]);
    return res.json({
      userData,
      schoolData,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching details',
      error: err.message,
    });
  }
};

export const UploadUserDetails = async (req, res) => {
  let userType = req.body.userType;
  let id = req.body.sid;

  try {
    console.log('Getting User details of ' + userType + id);
    let User =
      userType === 'teacher'
        ? Teacher
        : userType === 'student' ? Student : userType === 'admin' ? Admin : Teacher;
    let [userData, schoolData] = await Promise.all([
      User.findOneAndUpdate(
        {
          sid: id,
        },
        {
          $set: {
            ...req.body,
          },
        },
        {
          new: true,
        }
      ),
      School.findOne({
        schoolId: req.user.schoolId,
      }),
    ]);
    return res.json({
      userData,
      schoolData,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error Updating User details',
      error: err.message,
    });
  }
};

export const GetAcademicDetails = (req, res) => {
  AcademicDetails.find({ schoolId: req.user.schoolId })
    .then(data => res.json(data))
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Error Fetching Department',
        error: err.message,
      });
    });
};

export const AcademicDetailsUpdate = (req, res) => {
  let { _id } = req.body;
  if (_id) {
    AcademicDetails.findOneAndUpdate(
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
        res.status(500).json({
          message: 'Error updating',
          error: err.message,
        });
      });
  } else {
    AcademicDetails.create({
      ...req.body,
      schoolId: req.user.schoolId,
    })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).json({
          message: 'Error Creating',
          error: err.message,
        });
      });
  }
};
