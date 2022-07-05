const { db, DataTypes } = require('../utils/database.util');

const Consoles = db.define('consoles', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
    },
    company: {
        allowNull: false,
        type: DataTypes.STRING
    },
    status: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'active'
    }
});

module.exports = { Consoles };