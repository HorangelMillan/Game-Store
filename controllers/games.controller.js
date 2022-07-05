// models
const { Games } = require('../models/games.model');
const { Reviews } = require('../models/reviews.model');
const { Consoles } = require('../models/consoles.model');
const { GamesInConsoles } = require('../models/gamesInConsoles.model');

// utils
const { catchAsync } = require("../utils/catchAsync.util");

// create controllers
const createGame = catchAsync(async (req, res, next) => {
    const { title, genre, consoleId, id } = req.body;

    const gameCreated = await Games.create({
        title,
        genre,
    });

    if (consoleId) {
        console.log(consoleId)
        await GamesInConsoles.create({
            gameId: gameCreated.id,
            consoleId
        });
    };

    res.status(200).json({
        status: 'success',
        gameCreated
    });
});

const getAllGames = catchAsync(async (req, res, next) => {
    const games = await Games.findAll({
        include: [{ model: Reviews }, { model: Consoles }],
        where: {
            status: 'active'
        }
    });

    res.status(200).json({
        status: 'success',
        games
    });
});

const updateGame = catchAsync(async (req, res, next) => {
    const { title, id } = req.body;

    await Games.update({
        title
    }, {
        where: {
            id
        }
    });

    res.status(200).json({
        status: 'success',
    });
});

const disableGame = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    await Games.update({
        status: 'disabled'
    }, {
        where: {
            id
        }
    });

    res.status(200).json({
        status: 'success',
    });
});

const createReview = catchAsync(async (req, res, next) => {
    const { comment, id } = req.body;
    const { sessionUser } = req;

    const createdReview = await Reviews.create({
        comment,
        userId: sessionUser.id,
        gameId: id
    });

    res.status(200).json({
        status: 'success',
        createdReview
    });
});

module.exports = {
    createGame,
    getAllGames,
    updateGame,
    disableGame,
    createReview
};