import regeneratorRuntime from 'regenerator-runtime';

import Users from '../models/Users';
import Teacher from '../models/Teacher';
import Student from '../models/Student';
import Admin from '../models/Admin';
import School from '../models/School';
import { resolve } from 'path';

export const Register = (req, res) => {
  let type = req.body.userType;
  if (req.body.userType !== 'super') {
    userRegister(req.body, req.user)
      .then(user => {
        if (user.userType) {
          createUser(type, { ...req.body, schoolId: req.user.schoolId }, user.sid)
            .then(user => {
              return res.json({
                message: 'Registered Successfully',
                user: { ...user },
              });
            })
            .catch(err => {
              
              return console.log(err),res.status(400).json({ message: err.message,}); 
              
            });
        }
      })
      .catch(err => {
       
        return console.log(err),res.status(400).json({ message: err.message,});
      });
  } else {
    userRegister(req.body)
      .then(user => {
        return res.json({
          message: 'Registered Successfully',
          user: { ...user },
        });
      })
      .catch(err => {
        return res.status(400).json({
          message: err.message,
        });
      });
  }
};

const userRegister = (body, user) => {
  let type = body.userType;
  let id = user ? user.schoolId : 'super';

  let newUser = new Users({
    ...body,
    userType: body.userType === 'school' ? 'admin' : body.userType,
    schoolId: id,
  });

  return new Promise((resolve, reject) => {
    Users.register(newUser, body.password, (err, user) => {
      if (err) {
        reject(err);
      }
      resolve(user);
    });
  });
};

export const CreateSchool = (req, res) => {
  let schoolId = req.body.shortCode + Math.floor(Math.random() * (1000 - 1 + 1)) + 1;

  School.create({
    ...req.body,
    schoolId,
  })
    .then(async data => {
      let adminObj = {
        userType: 'admin',
        email: data.email,
        username: data.shortCode,
        phoneNumber: data.phoneNumber,
        fullName: data.schoolName,
        schoolId: data.schoolId,
        password: req.body.password,
        sid: data.sid,
      };
      try {
        let [user, authn] = await Promise.all([
          createUser('admin', adminObj, data.sid),
          userRegister(adminObj, adminObj),
        ]);
        return res.json({
          user,
          authn,
        });
      } catch (err) {
        res.status(500).json({
          message: 'Error Registering User',
          error: err.message,
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error Registering School',
        error: err.message,
      });
    });
};

const createUser = (userType, body, id) => {
  let User =
    userType === 'teacher'
      ? Teacher
      : userType === 'student' ? Student : userType === 'admin' ? Admin : Teacher;
  return new Promise((resolve, reject) => {
    User.create({ ...body, sid: id })
      .then(user => {
        resolve(user);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const Login = (req, res) => {
  let user = req.user;
  return res.json({
    message: 'Login Successful',
    user: {
      ...req.user,
      salt: undefined,
      hash: undefined,
    },
  });
};

// Get user data from client side
export const AuthMe = (req, res) => {
  if (req.user) {
    return res.json({
      authenticated: true,
      user: req.user,
    });
  }
  return res.json({
    authenticated: false,
  });
};

// Auth Middleware
export const RedirectNoAuth = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/whatever');
  }
  return next();
};

export const Logout = (req, res) => {
  req.logout();
  res.json({
    message: 'Logout',
  });
};
