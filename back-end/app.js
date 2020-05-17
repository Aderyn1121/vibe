const express = require('express');
const morgan = require('morgan');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const playlistRouter = require('./routes/playlist');
const { environment } = require('./config');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/playlists', playlistRouter);



// Generic error handler.
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    const isProduction = environment === "production";
    res.json({
      title: err.title || "Server Error",
      message: err.message,
      errors: err.errors,
      stack: isProduction ? null : err.stack,
    });
  });
  
module.exports = app;