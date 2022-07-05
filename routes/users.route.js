const express = require('express');

// controllers
const {
    createUser,
    loginUser,
    updateUser,
    disableUser,
    getAllUsers
} = require('../controllers/users.controller');

// middlewares
const { createUserValidators, updateUserValidators } = require('../middlewares/validators.middleware');
const { isUser, isEmail } = require('../middlewares/users.middleware');
const { hashPassword, comparePassword } = require('../middlewares/security.middleware');
const { protectUserAccount, protectSession } = require('../middlewares/auth.middleware');

// define routes
const usersRouter = express.Router();

usersRouter.post('/signup', createUserValidators, hashPassword, createUser);

usersRouter.post('/login', isEmail, comparePassword, loginUser);

usersRouter.use('/:id', isUser, protectSession, protectUserAccount)
    .route('/:id')
    .patch(updateUserValidators ,updateUser)
    .delete(disableUser);

usersRouter.get('/', protectSession, getAllUsers);

module.exports = { usersRouter };