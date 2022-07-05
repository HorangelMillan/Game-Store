const express = require('express');

// controllers
const { createConsole, getAllConsoles } = require('../controllers/consoles.controller');
const { protectSession } = require('../middlewares/auth.middleware');
const { createConsoleValidators } = require('../middlewares/validators.middleware');

// define routes
const consolesRouter = express.Router();

consolesRouter.post('/', protectSession, createConsoleValidators, createConsole);

consolesRouter.get('/', getAllConsoles);

consolesRouter.patch('/:id', );

consolesRouter.delete('/:id', );

module.exports = { consolesRouter };