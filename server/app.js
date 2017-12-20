import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import Ottoman from 'ottoman';
import dotenv from 'dotenv';
import Couchbase from 'couchbase';
import routes from './routes';
import routess from './ottoman_routes';
const app = express();
app.disable('x-powered-by');
//mongodb://schoolms:schoolms@ds051630.mlab.com:51630/schoolms
//mongodb://localhost/schoolMSdev

// var bucket = (new Couchbase.Cluster("couchbase://localhost")).openBucket("example");
// Ottoman.store = new Ottoman.CbStoreAdapter(bucket, Couchbase);


mongoose.connect('mongodb://samie820:Agboworin_9254@ds117316.mlab.com:17316/schoolms', err => {
  if (err) {
    console.error(err);
    process.exit(1);
    return;
  }
  console.log('Database Connected Successfully!');
});

app.use(
  logger('dev', {
    skip: () => app.get('env') === 'test',
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '/public')));

// app.engine('html', require('ejs').renderFile)
// app.set('view engine', 'ejs')

// Routes
app.use('/', routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// Error handler
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  res.status(err.status || 500).render('error', {
    error: err.status,
    message: err.message,
  });
});

export default app;
