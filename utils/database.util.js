const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const db = new Sequelize({
    dialect: 'postgres',
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    logging: false
});

module.exports = { db, DataTypes };