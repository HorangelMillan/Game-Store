const express = require('express');

// controllers
const {
    createConsole,
    getAllConsoles,
    updateConsole,
    disableConsole
} = require('../controllers/consoles.controller');

// middlewares
const { protectSession } = require('../middlewares/auth.middleware');
const { isConsole } = require('../middlewares/consoles.middlewares');
const { createConsoleValidators } = require('../middlewares/validators.middleware');


// define routes
const consolesRouter = express.Router();

consolesRouter.post('/', protectSession, createConsoleValidators, createConsole);

consolesRouter.get('/', getAllConsoles);

consolesRouter.use('/:id', protectSession, isConsole)
    .patch('/:id', updateConsole)
    .delete('/:id', disableConsole);

module.exports = { consolesRouter };