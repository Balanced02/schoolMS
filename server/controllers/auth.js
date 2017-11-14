import Users from '../models/Users';
import Teacher from '../models/Teacher';
import Student from '../models/Student';
import Admin from '../models/Admin';
import School from '../models/School';

export const Register = (req, res) => {
  let newUser = new Users({
    ...req.body,
  });
  Users.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        message: err.message,
      });
    } else {
      if (user.userType) {
        createUser(user.userType, req.body, user.sid)
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
    }
  });
};

const createUser = (userType, body, id) => {
  let User =
    userType === 'teacher'
      ? Teacher
      : userType === 'student' ? Student : userType === 'admin' ? Admin : Teacher;
  return new Promise((resolve, reject) => {
    if (userType !== 'school') {
      User.create({ ...body, sid: id })
        .then(user => {
          resolve(user);
        })
        .catch(err => {
          reject(err);
        });
    } else if (userType === 'school') {
      School.create({ ...body })
        .then(user => {
          console.log(user);
          let adminObj = {
            email: user.email,
            username: user.shortCode,
            phoneNumber: user.phoneNumber,
            fullName: user.schoolName,
            username: user.schoolName,
          };
          createUser('admin', adminObj, user.id);
        })
        .catch(err => reject(err));
    }
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
