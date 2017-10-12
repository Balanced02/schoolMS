import express, { Router } from 'express';
import path from 'path';
import { SummaryData } from './controllers/api';

const router = Router();
const admin = Router();
const api = Router();

export const dbs = {
  default: {
    uri: 'mongodb://localhost/lboxdev',
  },
};

// function getDbUriFromReq(path) {
//   return dbs[path].uri || dbs.default.uri
// }

// router.use(function(req, res, next) {
//   // console.log(req.route, req.path, req.baseUrl, req.subdomains)
//   let school = req.params.school.toLowerCase();
//   req.db_uri = dbs[clientPath] ? dbs[clientPath].uri : dbs.default.uri;
//   next();
// });

router.use('/', admin);
admin.use(express.static(path.join(__dirname, '../client/build')));

router.use('/api', api);

api.get('/getSummary', SummaryData);

// router.use((req, res, next) => {
//   setTimeout(function() {
//     next();
//   }, 2000);
// });

export default router;
