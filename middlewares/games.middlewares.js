// models
const { Games } = require('../models/games.model');

// utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const isGame = catchAsync(async (req, res, next) => {
    const { id, gameId } = req.params;

    let paramId = id;

    if (!paramId) {
        paramId = gameId;
    };

    const game = await Games.findOne({
        where: {
            id: paramId
        }
    });

    if (!game) {
        return next(new AppError('game is not exist'));
    };

    req.body.id = paramId;
    next()
});

module.exports = { isGame };