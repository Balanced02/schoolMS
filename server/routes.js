import express, { Router } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';
import multer from 'multer';

import Users from './models/Users';

import { Register, Login, Logout, RedirectNoAuth, AuthMe, CreateSchool } from './controllers/auth';
import {
  SummaryData,
  CreateNotice,
  CreateNote,
  GetNotes,
  CreateCourse,
  AllCourse,
  UpdateCourse,
  VisitorData,
  GetVisitors,
  GetTeachers,
  AllClass,
  AddClass,
  UpdateClass,
  LeaveApplication,
  GetLeave,
  LeaveUpdate,
  NewDepartment,
  FetchDepartment,
  CategoryUpdate,
  GetLeaveCategory,
  GetUserCategory,
  AddUserCategory,
  AddPayHead,
  GetPayHead,
  EditSchool,
  GetSchools,
  UploadFile,
  LibraryCategoryUpdate,
  getImg,
  GetLibraryCategory,
  UpdateSchool,
  CreateStudentGatePass,
  GetStudentGatePass,
  DeleteStudentGatePass,
  GetUserDetails,
  UploadUserDetails,
  CreateStudentCategory,
  GetStudentCategory,
  GetAcademicDetails,
  AcademicDetailsUpdate,
} from './controllers/api';

const app = express();
const router = Router();
const api = Router();

var upload = multer({ dest: './public/logos' });

const MongoStore = connectMongo(session);
router.use(cookieParser());
router.use(
  session({
    secret: process.env.SESSION_SECRET || 's3cret diz@6l3d',
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 3.6e6, // 1 Hour session
    },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
  })
);

// PassportJS Setup
router.use(passport.initialize());
router.use(passport.session());

const LocalStrategy = passportLocal.Strategy;
passport.use(new LocalStrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

router.use('/api', api);

router.use(express.static(path.join(__dirname, '../client/build')));

// Auth
api.get('/me', AuthMe);
api.post('/auth/login', passport.authenticate('local'), Login);
api.post('/auth/createSchool', CreateSchool);
api.post('/auth/register', Register);
api.get('/auth/logout', Logout);

// Auth Middleware
api.use(RedirectNoAuth);

//Queries
api.get('/getSummary', SummaryData);
api.get('/getStudentGatePass', GetStudentGatePass);
api.get('/getNotes', GetNotes);
api.get('/allCourse', AllCourse);
api.get('/allVisitors', GetVisitors);
api.get('/allTeachers', GetTeachers);
api.get('/GetStudentCategory', GetStudentCategory);
api.get('/allClass', AllClass);
api.get('/allLeave/:id', GetLeave);
api.get('/getLeaveCategory', GetLeaveCategory);
api.get('/getDepartments', FetchDepartment);
api.get('/getUserCategory', GetUserCategory);
api.get('/getPayRollDetails', GetPayHead);
api.get('/getSchools', GetSchools);
api.get('/getLibraryCategory', GetLibraryCategory);
api.post('/getUserDetails', GetUserDetails);
api.get('/getAcademicDetails', GetAcademicDetails);
//api.post('/studentCategory', DeleteStudentGatePass);

//actions
api.post('/getImageUrl', (req, res) => {
  let { logo } = req.body;
  getImg(logo)
    .then(link => res.json(link))
    .catch(err =>
      res.status(500).json({
        message: 'Error Uploading Logo',
        error: err.message,
      })
    );
});
api.post('/newVisitor', VisitorData);
api.post('/createStudentGatePass', CreateStudentGatePass);
api.post('/createNotice', CreateNotice);
api.post('/createNote', CreateNote);
api.post('/createCourse', CreateCourse);
api.post('/updateCourse', UpdateCourse);
api.post('/addClass', AddClass);
api.post('/updateClass', UpdateClass);
api.post('/leaveApplication', LeaveApplication);
api.post('/createStudentCategory', CreateStudentCategory);
api.post('/updateLeave', LeaveUpdate);
api.post('/newDepartment', NewDepartment);
api.post('/addLeaveCategory', CategoryUpdate);
api.post('/addUserCategory', AddUserCategory);
api.post('/addPayRollDetails', AddPayHead);
api.post('/editSchool', EditSchool);
api.post('/addLibraryCategory', LibraryCategoryUpdate);
api.post('/updateSchool', UpdateSchool);
api.post('/uploadFile', upload.single('logos'), UploadFile);
api.post('/updateUserDetails', UploadUserDetails);
api.post('/newAcademicYear', AcademicDetailsUpdate);

export default router;
