const path = require('path')

const config = {
    environment: process.env.NODE_ENV,
    port: 3000,
    keys: [process.env.APP_KEY],
    repoDir: process.env.REPO_DIR || path.join(__dirname, '..', 'repos'),
    logLevel: process.env.LOG_LEVEL,
}

exports.config = config

const { appLogger } = require('./middlewares/logger')
appLogger.info('config_loaded', { config })
