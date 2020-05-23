const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const playlistRouter = require('./routes/playlist');
const userAuthRouter = require('./routes/userAuth');
const searchRouter = require('./routes/search');
const songRouter = require('./routes/songs');
const { environment } = require('./config');

const app = express();

const origin = process.env.FRONTEND_URL;
app.use(cors({ origin }));
app.use(morgan('dev'));
app.use(express.json());
app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/playlists', playlistRouter);
app.use('/search', searchRouter);
app.use('/songs', songRouter);
app.use('/', userAuthRouter);

// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.status = 404;
  err.errors = ['Could not find string of resource'];
  next(err);
});

// Generic error handler.
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = environment === 'production';
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
