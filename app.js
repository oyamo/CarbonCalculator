const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');
require('dotenv').config()
const fs = require('fs');



const loginRouter = require('./microservices/auth/login');
const logoutRouter = require('./microservices/auth/logout');
const signUpRouter = require('./microservices/auth/signup');
const myprofileRouter = require('./microservices/users/myProfile');
const otherProfileRouter = require('./microservices/users/otherUsers')
const indexRouter = require('./microservices/index');
const forgotPasswordRouter = require('./microservices/auth/resetpassword');


const app = express();

app.use(cors())
app.use(logger(`dev`));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());
app.use(logger('common',{
    stream: fs.createWriteStream(process.env.LOGS_DIR)
}))


app.use('/', indexRouter);
//Microservices
app.use('/api/auth/signup', signUpRouter);
app.use('/api/auth/login', loginRouter);
app.use('/api/auth/logout', logoutRouter);
app.use('/api/auth/forgot', forgotPasswordRouter);
//Current user profile
//User must be logged in
app.use('/api/users/profile', myprofileRouter);

app.use('/api/users', otherProfileRouter);
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
    if(process.env.NODE_ENV === 'development'){
        res.json(err);
    }else{
        res.json({message:"ServerError"});
    }
});
//Database Setup
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE,
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

