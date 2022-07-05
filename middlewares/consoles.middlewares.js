// models
const { Consoles } = require('../models/consoles.model');

// utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const isConsole = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const console = await Consoles.findOne({
        where: {
            id
        }
    });

    if (!console) {
        return next(new AppError('console is not exist', 404));
    };

    req.body.id = console.id;
    next();
});

module.exports = { isConsole };