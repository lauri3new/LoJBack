var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
// morgan middleware logging requests/responses during development
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// cors for development
var cors = require('cors');
// mongoose
var mongoose = require('mongoose');
// mongoose connection
var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/football';
mongoose.connect(mongoUri);
// var kit = require('kit');

var index = require('./routes/index');

var app = express();

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// set up cors for development
const corsOptions = {
  origin: 'http://localhost:8080'
};
app.use(cors(corsOptions));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
