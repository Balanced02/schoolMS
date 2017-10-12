import School from '../models/School';
import { RegisterStudent, LoginStudent } from './auth.controller';

export const HomeController = (req, res) => {
  res.render('index', { title: 'Express Babel Boilerplate' });
};

export const CreateSchool = (req, res) => {
  // School(req).create({
  //   name: req.db_uri + "'s School",
  //   students: parseInt(Math.random() * 100),
  //   address: 'Random Address',
  // })
  res.send('School Created');
};

export { LoginStudent, RegisterStudent };
