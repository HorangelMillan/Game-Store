// models
const { Users } = require('../models/user.model');

// utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const isUser = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const user = await Users.findOne({
        where: {
            id
        }
    });

    if (!user) {
        return next(new AppError('User not found', 404));
    };

    req.user = user;
    next();
});

const isEmail = catchAsync(async (req, res, next) => {
    const { email } = req.body;

    const user = await Users.findOne({
        where: {
            email,
            status: 'active'
        }
    });

    if (!user) {
        return next(new AppError('invalid credentials'), 401);
    };

    req.user = user;
    next()
});

module.exports = { isUser, isEmail };