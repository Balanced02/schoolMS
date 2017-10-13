import regeneratorRuntime from 'regenerator-runtime';
import Notice from '../models/Notice';
import Student from '../models/Student';
import Teacher from '../models/Teacher';
import Course from '../models/Course';
import Visitor from '../models/Visitor';

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
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching courses',
      error: err.message,
    });
  }
};

export const SummaryData = async (req, res) => {
  console.log('Getting Summary');
  try {
    let [totalStudents, pendingReg, totalTeachers, noticeBoard] = await Promise.all([
      Student.find().count(),
      Student.find({ accepted: true }).count(),
      Teacher.find().count(),
      Notice.find().sort('date'),
    ]);
    return res.json({
      totalStudents,
      pendingReg,
      totalTeachers,
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
