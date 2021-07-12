var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



const mongoose = require('mongoose'); 

const dbURI = 'mongodb://localhost/Loc8r';
mongoose.connect(dbURI, {useNewUrlParser: true});


mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', err => {
  console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');




var app = express();


const port = 3000;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/signup', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
