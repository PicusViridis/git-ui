const Sequelize = require('sequelize')
const { config } = require('./config')
const { appLogger } = require('./middlewares/logger')
const path = require('path')

const connection = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', 'db', 'database.sqlite'),
    define: { timestamps: false },
})

appLogger.info('db_init', { port: config.port })

const User = connection.define(
    'User',
    {
        username: { type: Sequelize.STRING, primaryKey: true },
        password: Sequelize.STRING,
    },
    { tableName: 'user' }
)

exports.User = User
