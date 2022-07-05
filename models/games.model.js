const { db, DataTypes } = require('../utils/database.util');

const Games = db.define('games', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    genre: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    status: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'active'
    }
});

module.exports = { Games };