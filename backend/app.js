var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Personal = require('./routes/personal');
const selectManagement = require('./routes/selectManagement');
const paperManagement = require('./routes/paperManagement');
const personal = new Personal();
const select = new selectManagement();
const papermanagement = new paperManagement();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/login', require('./routes/login'));
app.use('/license', require('./routes/license'));
//选题管理
app.get('/selectManagement/allElective', select.allSelect);
app.get('/selectManagement/zxc', select.zxc);
app.get('/selectManagement/myElective', select.myElective);
app.get('/selectManagement/selectedElective', select.selectedElective);
app.get('/selectManagement/unSelectedElective', select.unSelectedElective);
//个人中心
app.use('/personal/personalInfo', require('./routes/test'));
// app.get('/personal/personalInfo/api',personal.querdata)
app.use('/personal/myResults', personal.myResults);
app.use('/personal/help', personal.help);
//论文管理
app.get('/paperManagement/task', papermanagement.task);
app.get('/paperManagement/openingReport', papermanagement.openingReport);
app.get('/paperManagement/midInspection', papermanagement.midInspection);
app.get('/paperManagement/paperReview', papermanagement.paperReview);
app.get('/paperManagement/paperSubmit', papermanagement.paperSubmit);

app.use('/log', require('./routes/log'));
app.use('/logout', require('./routes/logout'));
app.use('/teacherQuery', require('./routes/teacherQuery'))

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
