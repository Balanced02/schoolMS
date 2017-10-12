import bcrypt from 'bcrypt';

import Student from '../models/Student';

export const RegisterStudent = (req, res) => {
  let { username, password, name, phone } = req.body;
  if (!username || !password || !name || !phone)
    return res.status(401).json({ message: 'Some Credentials not Provided.' });
  bcrypt.hash(password, 8, function(err, hash) {
    if (err) return res.status(500).json(err);
    // Store hash in your password DB.
    Student.create({
      username,
      password,
      hash,
      name,
      phone,
    })
      .then(student => {
        return res.json(student);
      })
      .catch(err => {
        return res.status(500).json(err);
      });
  });
};

export const LoginStudent = (req, res) => {
  let { username, password } = req.body;
  Student.findOne({ username })
    .then(student => {
      if (!student) {
        return res.status(401).json({ message: 'Username is Incorrect' });
      }
      bcrypt.compare(password, student.hash, (err, result) => {
        if (err) return res.status(400).json(err);
        if (result) {
          return res.json(student);
        } else {
          return res.status(401).json({ messgae: 'Username or Password Incorrect' });
        }
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
};
