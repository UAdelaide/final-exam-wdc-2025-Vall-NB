const express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mysql = require('mysql2');
require('dotenv').config();

const app = express();

app.use(session({
  secret: 'sessionsecrets',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(cookieParser);
app.use(session);

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

// Export the app instead of listening here
module.exports = app;