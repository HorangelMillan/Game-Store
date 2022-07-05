// models
const { Consoles } = require('../models/consoles.model');
const { Games } = require('../models/games.model');

// utils
const { catchAsync } = require('../utils/catchAsync.util');

// create controllers
const createConsole = catchAsync(async (req, res, next) => {
    const { name, company } = req.body;

    const createdConsole = await Consoles.create({
        name,
        company
    });

    res.status(200).json({
        status: 'success',
        createdConsole
    });
});

const getAllConsoles = catchAsync(async (req, res, next) => {
    const consoles = await Consoles.findAll({
        include: { model: Games }
    });

    res.status(200).json({
        status: 'success',
        consoles
    });
});

const updateConsole = catchAsync(async (req, res, next) => {
    const { name, id } = req.body;

    await Consoles.update({
        name
    }, {
        where: {
            id
        }
    });

    res.status(200).json({
        status: 'success'
    });
});

const disableConsole = catchAsync(async (req, res, next) => {
    const { id } = req.body;

    await Consoles.update({
        status: 'disabled'
    }, {
        where: {
            id
        }
    });

    res.status(200).json({
        status: 'success'
    });
});

module.exports = {
    createConsole,
    getAllConsoles,
    updateConsole,
    disableConsole
};