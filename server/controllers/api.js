import Notice from '../models/Notice';
import School from '../models/School';
import Student from '../models/Student';
import Teacher from '../models/Teacher';

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

export const FindNotice = async (req, res) => {
  let search = {
    $regex: req.params.id,
    $options: 'i',
  };
  let results = await Staff.find()
    .sort('date')
    .limit(10);
  return res.json(results);
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
