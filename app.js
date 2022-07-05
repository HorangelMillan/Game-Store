const express = require('express');
require('dotenv').config(); // enviroment varibles

// Init express
const app = express();

// routes
const { usersRouter } = require('./routes/users.route');
const { consolesRouter } = require('./routes/consoles.route');
const { gamesRouter } = require('./routes/games.route');

// middlewares
app.use(express.json());

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/consoles', consolesRouter);
app.use('/api/v1/games', gamesRouter);

// global error handler
app.use('*', (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    
    res.status(statusCode).json({
        statusCode,
        status: err.status,
        err,
        message: err.message,
        stack: err.stack
    });
});

module.exports = { app };