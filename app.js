var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session'); // required for user sessions
var mysql = require('mysql'); // required to use DATABASE
var router = express.Router();


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var venueManagersRouter = require('./routes/venueManagers');
var adminsRouter = require('./routes/admins');

var dbConnectionPool = mysql.createPool({ // required to use DATABASE
    host: 'localhost',
    database: 'covid_tracking_db'
});

var app = express();

app.use(function(req, res, next) { // required to use DATABASE
    req.pool = dbConnectionPool;
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({ // required for user sessions
  secret: 'supersecrettoken',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/venueManagers', venueManagersRouter);
app.use('/admins', adminsRouter);

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
