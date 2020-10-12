var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var playerRouter = require('./routes/player');
var availabilityRouter = require('./routes/availability');
var pastAvailabilityRouter = require('./routes/past-availability');
var calendarRouter = require('./routes/calendar');
var locationRouter = require('./routes/location');
var matchPresenceRouter = require('./routes/match-presence');
var rankingRouter = require('./routes/ranking');
var resultsRouter = require('./routes/results');
var trainingPresenceRouter = require('./routes/training-presence');
var sendmailRouter = require('./routes/sendmail');

var matchRouter = require('./routes/match');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/players', playerRouter);
app.use('/availabilities', availabilityRouter);
app.use('/past-availabilities', pastAvailabilityRouter);
app.use('/calendar', calendarRouter);
app.use('/locations', locationRouter);
app.use('/match-presences', matchPresenceRouter);
app.use('/ranking', rankingRouter);
app.use('/results', resultsRouter);
app.use('/training-presences', trainingPresenceRouter);
app.use('/matches', matchRouter);
app.use('/sendmail', sendmailRouter);

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
