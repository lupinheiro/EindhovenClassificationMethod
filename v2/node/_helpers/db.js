const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    // init models and add them to the exported db object
    db.Account = require('../accounts/account.model')(sequelize);
    db.RefreshToken = require('../accounts/refresh-token.model')(sequelize);
    db.Context = require('../accounts/context.model')(sequelize);
    db.Category = require('../accounts/category.model')(sequelize);
    db.Process = require('../accounts/process.model')(sequelize);
    db.Line = require('../accounts/processLine.model')(sequelize);


    // define relationships
    db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
    db.Account.hasMany(db.Line, { onDelete: 'CASCADE' });
    db.Line.belongsTo(db.Account);
    db.Line.hasMany(db.Process);
    db.RefreshToken.belongsTo(db.Account);
    db.Process.belongsTo(db.Line);
    db.Process.hasMany(db.Context, { onDelete: 'CASCADE' });
    db.Context.belongsTo(db.Process);
    db.Context.hasMany(db.Category, { onDelete: 'CASCADE' });
    db.Category.belongsTo(db.Context);
    

       
    // sync all models with database
    await sequelize.sync();
}