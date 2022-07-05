const express = require('express');

// controllers
const {
    createGame,
    getAllGames,
    updateGame,
    disableGame,
    createReview
} = require('../controllers/games.controller');

// middlewares
const { protectSession } = require('../middlewares/auth.middleware');
const { isGame } = require('../middlewares/games.middlewares');
const {
    createGameValidators,
    createReviewValidators,
    updateGameValidators
} = require('../middlewares/validators.middleware');

// define routes
const gamesRouter = express.Router();

gamesRouter.post('/', protectSession, createGameValidators, createGame);

gamesRouter.get('/', getAllGames);

gamesRouter.use('/:id', protectSession, isGame)
    .route('/:id')
    .patch(updateGameValidators, updateGame)
    .delete(disableGame);

gamesRouter.post('/reviews/:gameId', protectSession, isGame, createReviewValidators, createReview);

module.exports = { gamesRouter };