import Users from '../models/Users';
import Teacher from '../models/Teacher';
import Student from '../models/Student';
import Admin from '../models/Admin';
import School from '../models/School';
import { resolve } from 'path';

export const Register = (req, res) => {
  let type = req.body.userType;
  let newUser = new Users({
    ...req.body,
    userType: req.body.userType === 'school' ? 'admin' : req.body.userType,
  });
  Users.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        message: err.message,
      });
    } else {
      if (user.userType !== 'super') {
        if (user.userType) {
          createSchool(type, req.body, user.sid)
            .then(user => {
              return res.json({
                message: 'Registered Successfully',
                user: { ...user },
              });
            })
            .catch(err => {
              console.log(err);
              return res.status(400).json({
                message: err.message,
              });
            });
        }
      } else {
        res.json({
          message: 'Registered Successfully',
          user: { ...user },
        });
      }
    }
  });
};

const createSchool = async (userType, body, id) => {
  console.log(userType);
  if (userType !== 'school') {
    return new Promise((resolve, reject) => {
      console.log(body);
      createUser(userType, body, id)
        .then(data => resolve(data))
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  }

  School.create({ ...body })
    .then(user => {
      console.log(user);
      let adminObj = {
        email: user.email,
        username: user.shortCode,
        phoneNumber: user.phoneNumber,
        fullName: user.schoolName,
      };
      return new Promise((resolve, reject) =>
        createUser('admin', adminObj, user.id)
          .then(data => resolve(data))
          .catch(err => reject(err))
      );
    })
    .catch(err => reject(err));
};

const createUser = (userType, body, id) => {
  console.log('Creating: ' + userType);
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
