const express = require('express');
const morgan = require('morgan')
const userRouter = require('./routes/user');

const app = express();

app.use(morgan('dev'))
app.use('/', userRouter)

app.get('/', (req, res)=>{
    res.send("the user route is working")
})




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