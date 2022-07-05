const { body, validationResult } = require('express-validator');

// utils
const { AppError } = require('../utils/appError.util');

const checkResult = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorsArray = errors.array();
        const errorMessages = errorsArray.map(error => error.msg);
        errorMessages.join(', ');
        return next(new AppError(errorMessages, 400));
    };

    next();
};

// create validators
const createUserValidators = [
    body('name')
        .isString().withMessage('name cannot be empty')
        .custom((value) => {
            if (value === "") {
                throw new Error('name cannot be a empty text string');
            };
            return true;
        }),
    body('email').isEmail().withMessage('must provide a valid email'),
    body('password').isAlphanumeric()
        .withMessage('password must has numbers and letters').isLength({ min: 8 })
        .withMessage('password must has least 8 digits'),
    checkResult
];

const createGameValidators = [
    body('title').isString().withMessage('title cannot be empty'),
    body('genre').isString().withMessage('genre cannot be empty'),
    checkResult
];

const createReviewValidators = [
    body('comment').isString().withMessage('title cannot be empty'),
    checkResult
];

const createConsoleValidators = [
    body('name').isString().withMessage('name cannot be empty'),
    body('company').isString().withMessage('company cannot be empty'),
    checkResult
];

// update validators
const updateUserValidators = [
    body('name')
        .isString().withMessage('name cannot be empty')
        .custom((value) => {
            if (value === "") {
                throw new Error('name cannot be a empty text string');
            };
            return true;
        }),
    body('email').isEmail().withMessage('must provide a valid email'),
    checkResult
];

const updateGameValidators = [
    body('title').isString().withMessage('title cannot be empty'),
    checkResult
];

module.exports = {
    createUserValidators,
    createGameValidators,
    createReviewValidators,
    createConsoleValidators,
    updateGameValidators,
    updateUserValidators,
};