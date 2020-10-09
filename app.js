const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const config = require('./config').get(process.env.NODE_ENV);


const loginRouter = require('./routes/auth/login');
const logoutRouter = require('./routes/auth/logout');
const signUpRouter = require('./routes/auth/signup');
const profileRouter = require('./routes/users/profile');
const indexRouter = require('./routes/index');
const forgotPasswordRouter = require('./routes/auth/resetpassword');


const app = express();


app.use(logger(`dev`));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/signup', signUpRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/profile', profileRouter);
app.use('/api/forgot', forgotPasswordRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send('error');
});
//Database Setup
mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    err => {
        if (err) {
            ///Error
        } else {
            console.log('Connected to database');
        }
    });
module.exports = app;

