var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql2/promise');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

let dbConnectionPool;
(async () => {
    try {
        dbConnectionPool = mysql.createPool({ database: 'pokepare', user: 'root' });

        var exist = dbConnectionPool.query("SELECT * FROM Users");
        if (exist.length === 0) {
            await dbConnectionPool.query("INSERT INTO Users (username, email, password_hash, role) VALUES ('alice123', 'alice@example.com', 'hashed123', 1)");
            await dbConnectionPool.query("INSERT INTO Users (username, email, password_hash, role) VALUES ('bobwalker', 'bob@example.com', 'hashed456', 2)");

            await dbConnectionPool.query("INSERT INTO Dogs (owner_id, name, size) VALUES ( (SELECT user_id FROM Users WHERE username = 'alice123'), 'Max', 2)");
            await dbConnectionPool.query("INSERT INTO Dogs (owner_id, name, size) VALUES ( (SELECT user_id FROM Users WHERE username = 'alice123'), 'Max', 2)");
        }
    } catch(err) {
        console.error("Error setting up database.");
    }
})();

app.use(function(req, res, next) {
    req.pool = dbConnectionPool;
    next();
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
