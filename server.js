const { app } = require('./app');
const { db } = require('./utils/database.util');

// models
const { Users } = require('./models/user.model');
const { Reviews } = require('./models/reviews.model');
const { Games } = require('./models/games.model');
const { Consoles } = require('./models/consoles.model');
const { GamesInConsoles } = require('./models/gamesInConsoles.model');

// models relation
Users.hasMany(Reviews, { foreignKey: 'userId' }); // A user has many reviews
Reviews.belongsTo(Users); // and a review to a user

Games.hasMany(Reviews, { foreignKey: 'gameId' }); // A game has many reviews
Reviews.belongsTo(Games); // and a review to a game

Games.belongsToMany(Consoles, { // many games has many consoles
    foreignKey: 'gameId',
    through: GamesInConsoles
});

Consoles.belongsToMany(Games, { // many consoles has many games
    foreignKey: 'consoleId',
    through: GamesInConsoles
});

// datbase authentication
db.authenticate()
    .then(() => console.log('db is authenticated'))
    .catch(err => console.log(err));

// sync databse models
db.sync()
    .then(() => console.log('database models synced'))
    .catch(err => console.log(err));

// init server
app.listen(process.env.SERVER_PORT, () => console.log(`Server listen on port ${process.env.SERVER_PORT}`));