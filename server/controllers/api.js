import regeneratorRuntime from 'regenerator-runtime';
import Notice from '../models/Notice';
import Student from '../models/Student';
import Users from '../models/Users';
import Course from '../models/Course';
import Visitor from '../models/Visitor';
import Teacher from '../models/Teacher';
import ClassDetails from '../models/ClassDetails';

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
  console.log('Getting Summary');
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
    console.log(data);
    teachers = teachers.map(teacher => {
      let assignedClass = data
        .filter(d => teacher.fullName === d.teacher)
        .map(a => a.classTitle)
        .join(', ');
      console.log(assignedClass);
      teacher._doc.classInfo = assignedClass ? assignedClass : '';
      return teacher;
    });
    res.json({ teachers });
  } catch (err) {
    console.log(err);
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
      console.log(data);
      res.json({
        data,
      });
    })
    .catch(err => {
      console.log(err);
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
