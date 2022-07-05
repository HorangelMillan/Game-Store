const jwt = require('jsonwebtoken');
require('dotenv').config();

//models
const { Users } = require('../models/user.model');

// utils
const { catchAsync } = require('../utils/catchAsync.util');

// create controllers
const createUser = catchAsync(async (req, res, next) => {
    const { name, email, encryptedPassword } = req.body;

    const createdUser = await Users.create({
        name,
        email,
        password: encryptedPassword
    });

    createdUser.password = undefined;

    res.status(200).json({
        status: 'success',
        createdUser
    });
});

const loginUser = catchAsync(async (req, res, next) => {
    const { id } = req.user;

    const token = await jwt.sign({ id }, process.env.PRIVATE_KEY, { expiresIn: '1m' })

    res.status(200).json({
        status: 'succcess',
        token
    });
});

const updateUser = catchAsync(async (req, res, next) => {
    const { id } = req.sessionUser;
    const { name, email } = req.body;

    await Users.update({
        name,
        email
    }, {
        where: {
            id
        }
    });

    res.status(200).json({
        status: 'success'
    });
});

const disableUser = catchAsync(async (req, res, next) => {
    const { id } = req.sessionUser;

    await Users.update({
        status: 'disable'
    }, {
        where: {
            id
        }
    })

    res.status(200).json({
        status: 'success'
    });
});

const getAllUsers = catchAsync(async (req, res, next) => {
    const users = await Users.findAll({
        where: {
            status: 'active'
        }
    });

    res.status(200).json({
        status: 'success',
        users
    });
});

module.exports = {
    createUser,
    loginUser,
    updateUser,
    disableUser,
    getAllUsers
};
