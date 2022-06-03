/* eslint-disable no-unused-vars */
// import React, {ReactElement} from 'react';

// export default function App(): ReactElement {
//   return (
//     <div>Hello, world!</div>
//   );
// }

// import mongoose from 'mongoose';
import express from 'express';
import path, {dirname} from 'path';
import {fileURLToPath} from 'url';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';
import {create} from 'express-handlebars';
import indexRouter from './routes/index.js';
import recordRouter from './routes/record.js';

// create an express application
const app = express();

// Use Helmet to protect against well known vulnerabilities
app.use(helmet());

// view engine setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); // module doesn't have __dirname
console.log(__dirname);
app.set('views', path.join(__dirname, '../views'));
const hbs = create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// express middleware
app.use(cors());
app.use(express.json()); // to support json-encoded body
app.use(express.urlencoded()); // to support url-encoded body
app.use(logger('dev')); // predefined formats
app.use(express.static(path.join(__dirname, '../assets'))); // static files

// routes
app.use('/', indexRouter);
app.use('/record', recordRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // 404 response is not an error. Need to create an Error object first.
  const err = new Error(`Page not found`);
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // only providing error in development
  res.locals.message = err.message;
  res.locals.error = (req.app.get('env') === 'development') ? err : {};
  res.status(err.status || 500);
  res.render('error', {layout: 'index'});
});

export default app;
