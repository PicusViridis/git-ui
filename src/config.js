const config = {
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
    keys: [process.env.APP_KEY],
    repoDir: process.env.REPO_DIR,
    logLevel: process.env.LOG_LEVEL,
}

exports.config = config

const { appLogger } = require('./middlewares/logger')
appLogger.info('config_loaded', { config })
