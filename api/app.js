var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config(); 
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import your routes
const movieRoutes = require('./routes/movies');
const ticketRoutes = require('./routes/tickets');
const userRoutes = require('./routes/user');
const scheduleRoute = require('./routes/schedule');
const roomRoutes = require('./routes/rooms');
const stripeRoutes = require('./routes/stripe');

var app = express();

// Database Connection
mongoose.connect(process.env.Mongo_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/schedule', scheduleRoute);
app.use('/movies', movieRoutes);
app.use('/tickets', ticketRoutes);
app.use('/rooms', roomRoutes);
app.use('/stripe', stripeRoutes);

// Static file serving (if you have a frontend build directory)
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'dist', 'index.html'));
});

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

module.exports = app; // Export the app without starting the server
