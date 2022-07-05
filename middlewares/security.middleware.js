const bcrypt = require('bcrypt');

// utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

// create middlewares
const hashPassword = catchAsync(async (req, res, next) => {
    const { password } = req.body;

    const salt = await bcrypt.genSalt(12);
    const encryptedPassword = await bcrypt.hash(password, salt);

    req.body.encryptedPassword = encryptedPassword;
    next()
});

const comparePassword = catchAsync(async (req, res, next) => {
    const { user } = req;
    const { password } = req.body

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return next(new AppError('invalid credentials', 401));
    };

    next();
});

module.exports = { hashPassword, comparePassword };