var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var simpleValidationRouter = require('./routes/simple-validation');
var customMessageRouter = require('./routes/custom-message');
var customValidationRouter = require('./routes/custom-validation');
var schemaValidationRouter = require('./routes/schema-validation');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/simple-validation', simpleValidationRouter);
app.use('/custom-message', customMessageRouter);
app.use('/custom-validation', customValidationRouter);
app.use('/schema-validation', schemaValidationRouter);
module.exports = app;
