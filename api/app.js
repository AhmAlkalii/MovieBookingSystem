const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
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
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Database Connection
mongoose.connect(process.env.Mongo_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', indexRouter);  // Serve EJS content for root
app.use('/users', usersRouter); // Serve users resource

app.use('/api/user', userRoutes);
app.use('/api/schedule', scheduleRoute);
app.use('/movies', movieRoutes);
app.use('/tickets', ticketRoutes);
app.use('/rooms', roomRoutes);
app.use('/stripe', stripeRoutes);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
