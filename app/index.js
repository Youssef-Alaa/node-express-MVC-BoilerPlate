const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const passport = require('passport');
const trimRequest = require('trim-request');
const dbConnector = require('../config/database');
const mongoose = require('mongoose');
const { ServerError } = require('../utils/util');

const { userRouter } = require('./router/user.router');

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '50mb', strict: false }));
app.use(trimRequest.all);
app.use(logger('dev'));
app.use(passport.initialize());

mongoose
  .connect(dbConnector.url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(db => {
    console.log('- Connected successfully to database');

    app.get('/', (req, res, next) => {
      res.json({ message: 'server is Up and Running!' });
    });

    app.use('/users', userRouter);

    // 404 handler
    app.use('*', (req, res, next) => {
      next(new ServerError('API_NOT_FOUND', 404));
    });

    // error handler
    // eslint-disable-next-line no-unused-vars
    // error handler
    app.use((err, req, res, next) => {
    if (!err.status) {
      console.error(err);
    }
    console.log('Custom Server Error>', err.message);
    res.status(err.status).json({ message: err.message, status: err.status });
    });
  })
  .catch(err => {
    console.log(
      `- Failed while connecting to database with the following error(s): ${err}`
    );
  });
module.exports = { app };
