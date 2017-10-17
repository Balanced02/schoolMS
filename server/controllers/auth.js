import Users from '../models/Users';

export const Register = (req, res) => {
  let newUser = new Users({
    ...req.body,
  });
  console.log(req.body.username);
  // console.log(req.body.number);
  Users.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        message: err.message,
      });
    } else {
      return res.json({
        message: 'Registered Successfully',
        user: { ...user },
      });
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
    return res.redirect('/Users');
  }
  return next();
};

export const Logout = (req, res) => {
  req.logout();
  res.json({
    message: 'Logout',
  });
};
