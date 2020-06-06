const path = require('path')
const { createLogger, format, transports } = require('winston')
require('winston-daily-rotate-file')
const { config } = require('../config')

const dirname = path.join(__dirname, '..', '..', 'logs')

function parseErrorData(data) {
    if (!data) {
        return {}
    }
    if (typeof data !== 'object') {
        return { data }
    }
    return { data: { message: data.message, code: data.code } }
}

function parseErrorConfig(config) {
    if (!config) {
        return {}
    }
    if (typeof config !== 'object') {
        return { config }
    }
    return { config: { url: config.url, method: config.method } }
}

function parseError(error) {
    if (!error) {
        return {}
    }
    if (error.message && error.stack) {
        const { message, stack } = error
        return {
            error: {
                message,
                stack,
                ...(error.response && {
                    ...parseErrorData(error.response.data),
                    ...parseErrorConfig(error.response.config),
                }),
            },
        }
    }
    return { error }
}

function fileOptions(filename) {
    return {
        dirname,
        filename: `${filename}.%DATE%.log`,
        maxSize: '5m',
        maxFiles: 5,
        utc: true,
    }
}

function errorFormat() {
    return format((info) => ({ ...info, ...parseError(info.error) }))()
}

function fileFormat() {
    return format.combine(errorFormat(), format.timestamp(), format.json())
}

function consoleFormat() {
    return format.combine(errorFormat(), format.timestamp(), format.colorize(), format.simple())
}

function fileTransport(filename) {
    return new transports.DailyRotateFile({ format: fileFormat(), ...fileOptions(filename) })
}

function consoleTransport() {
    return new transports.Console({ format: consoleFormat() })
}

function getLogger(type) {
    return createLogger({ level: config.logLevel, transports: [fileTransport(type), consoleTransport()] })
}

const accessLogger = getLogger('access')
const errorLogger = getLogger('error')

const appLogger = getLogger('app')

function logger() {
    return async (ctx, next) => {
        const { method, url, params, query } = ctx
        const start = Date.now()
        try {
            await next()
            const { status } = ctx
            const end = Date.now()
            const duration = `${end - start}ms`
            accessLogger.info('request_success', { method, url, params, query, status, duration })
        } catch (error) {
            errorLogger.error('request_error', { method, url, params, query, error })
        }
    }
}

exports.appLogger = appLogger
exports.logger = logger
