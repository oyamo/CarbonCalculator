const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet')
const compression = require('compression')
require('dotenv').config()


// Swagger UI
swaggerUi = require("swagger-ui-express");
swaggerJsdoc = require("./swagger.json")


// Import routers
const userRouter = require("./api/v1/users/router")
const authRouter = require("./api/v1/auth/router")
const docRouter = require("./api/v1/docs/router")
const calcRouter = require("./api/v1/calculator/router")

const app = express();

app.use(cors())
app.use(logger(`dev`));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression())
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc))



app.use(require("./utils/defaultheaders"));
// error handler

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res['locals'].message = err.message;
    res['locals'].error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res['status']( err.status || 500);
    if(process.env.NODE_ENV === 'development'){
        res.json(err);
    }else{
        res.json({message:"ServerError"});
    }
});


// Set up routes
app.use("/api/v1/users", userRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/calculator", calcRouter)
app.use("/", docRouter)

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
            console.log(err)
        } else {
            console.log('Connected to database');
        }
    });

module.exports = app;

