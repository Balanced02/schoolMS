import express, { Router } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local';
import mongoose from 'mongoose';
import Ottoman from 'ottoman';
import connectMongo from 'connect-mongo';
import multer from 'multer';


import Users from './models/Users';

import { Register, Login, Logout, RedirectNoAuth, AuthMe, CreateSchool } from './controllers/auth';
import {
  SummaryData,
  CreateNotice,
  CreateNote,
  GetNotes,
  GetOtNotes,
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
  UpdateUserModule,
} from './controllers/api';

const app = express();
const router = Router();
const api = Router();

var upload = multer({ dest: './public/logos' });


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