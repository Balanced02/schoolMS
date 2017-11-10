import regeneratorRuntime from 'regenerator-runtime';
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

export const CreateNotice = (req, res) => {
  let { date, body } = req.body;
  Notice.create({
    date,
    body,
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
    let [courses, count] = await Promise.all([Course.find().sort('date'), Course.find().count()]);
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
  try {
    let [totalStudents, pendingReg, totalStaff, noticeBoard] = await Promise.all([
      Student.find().count(),
      Student.find({ accepted: true }).count(),
      Users.find().count(),
      Notice.find().sort('-created'),
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
  Course.create({ courseName, courseCode, minAttendance, description })
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
    ? newVisitor(req.body)
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
      Visitor.find()
        .sort('-timeIn')
        .limit(50),
      Visitor.find().count(),
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
    let [teachers, count] = await Promise.all([Teacher.find(), Teacher.find().count()]);
    let data = await ClassDetails.find({}, 'teacher classTitle');
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
  ClassDetails.find()
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
  ClassDetails.create({ ...req.body })
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
  Leave.create({ ...req.body })
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
  let searchQuery = {};
  if (id !== 'admin') {
    searchQuery = {
      teacherId: req.user.sid,
    };
  }

  try {
    let [leaves, count] = await Promise.all([
      Leave.find(searchQuery).sort('-status'),
      Leave.find(searchQuery).count(),
    ]);
    let data = await Teacher.find({}, 'sid fullName');
    leaves = leaves.map(leave => {
      let teacherName = data.filter(d => leave.teacherId === d.sid)[0];
      leave._doc.teacherName = teacherName ? teacherName.fullName : '';
      return leave;
    });
    res.json(leaves);
  } catch (error) {
    console.log(error);
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
      console.log(err);
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
        console.log(err);
        res.status(500).json({
          message: 'Error updating dept',
          error: err.message,
        });
      });
  } else {
    Department.create({
      ...req.body,
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
  Department.find()
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
        console.log(err);
        res.status(500).json({
          message: 'Error updating leave',
          error: err.message,
        });
      });
  } else {
    LeaveCategory.create({
      ...req.body,
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
  LeaveCategory.find()
    .then(leave => res.json(leave))
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Error Fetching Department',
        error: err.message,
      });
    });
};

export const AddUserCategory = (req, res) => {
  console.log(req.body);
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
        console.log(err);
        res.status(500).json({
          message: 'Error updating leave',
          error: err.message,
        });
      });
  } else {
    UserCategory.create({
      ...req.body,
    })
      .then(data => {
        res.json(data);
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

export const GetUserCategory = (req, res) => {
  UserCategory.find()
    .then(data => res.json(data))
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Error Fetching Department',
        error: err.message,
      });
    });
};
