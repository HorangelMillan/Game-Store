const jwt = require('jsonwebtoken');
require('dotenv').config();

// Models
const { Users } = require('../models/user.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const protectSession = catchAsync(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    };

    if (!token) {
        return next(new AppError('Invalid session', 403));
    };

    const decoded = await jwt.verify(token, process.env.PRIVATE_KEY);

    const user = await Users.findOne({
        where: { id: decoded.id, status: 'active' },
    });

    if (!user) {
        return next(
            new AppError('The owner of this token doesnt exist anymore', 403)
        );
    };

    req.sessionUser = user;
    next();
});

const protectUserAccount = catchAsync(async (req, res, next) => {
    const { sessionUser, params } = req;

    const user = await Users.findOne({
        where: {
            id: params.id
        }
    });

    if (sessionUser.id !== user.id) {
        return next(new AppError('You do not own this account', 403));
    };

    next();
});

module.exports = { protectSession, protectUserAccount };
