import Users from '../models/Users';
import Teacher from '../models/Teacher';
import Student from '../models/Student';
import Admin from '../models/Admin';

export const Register = (req, res) => {
  console.log(req.body);
  let newUser = new Users({
    ...req.body,
  });
  // console.log(req.body.username);
  // console.log(req.body.number);
  Users.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        message: err.message,
      });
    } else {
      if (user._doc.userType) {
        // console.log(Object.keys(user));
        // console.log(user._doc.userType);
        createUser(user._doc.userType, req.body, user._doc.sid)
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
      : userType === 'student' ? Student : userType === '' ? Admin : Teacher;
  return new Promise((resolve, reject) => {
    User.create({ ...body, sid: id })
      .then(user => {
        // console.log(User);
        resolve(user);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const Login = (req, res) => {
  let user = req.user;
  // console.log(user);
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
  // console.log(req.user);
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
