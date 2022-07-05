const { db, DataTypes } = require('../utils/database.util');

const GamesInConsoles = db.define('gamesInConsoles', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    status: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'active'
    }
});

module.exports = { GamesInConsoles };