import express, { Router } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';

import Users from './models/Users';

import { Register, Login, Logout, RedirectNoAuth, AuthMe } from './controllers/auth';
import {
  SummaryData,
  CreateNotice,
  CreateCourse,
  AllCourse,
  UpdateCourse,
  VisitorData,
  GetVisitors,
  GetTeachers,
  AllClass,
} from './controllers/api';

const router = Router();
const api = Router();

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
api.post('/auth/register', Register);
api.get('/auth/logout', Logout);

// Auth Middleware
api.use(RedirectNoAuth);

//Queries
api.get('/getSummary', SummaryData);
api.post('/createNotice', CreateNotice);
api.post('/createCourse', CreateCourse);
api.post('/updateCourse', UpdateCourse);
api.get('/allCourse', AllCourse);
api.post('/newVisitor', VisitorData);
api.get('/allVisitors', GetVisitors);
api.get('/allTeachers', GetTeachers);
api.get('/allClass', AllClass);

export default router;
