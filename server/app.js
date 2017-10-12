import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './routes';

const app = express();
app.disable('x-powered-by');

let db = mongoose.connect(process.env.DB_URI || 'mongodb://localhost/schoolMSdev', err => {
  if (err) {
    console.error(err);
    process.exit(1);
    return;
  }
  console.log('Database Connected Successfully!');
});

//View Engine Setup
app.set('view engine', 'html');

app.use(
  logger('dev', {
    skip: () => app.get('env') === 'test',
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

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
