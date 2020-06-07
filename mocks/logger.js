function format() {
    return () => {}
}

format.combine = jest.fn()
format.timestamp = jest.fn()
format.json = jest.fn()
format.colorize = jest.fn()
format.simple = jest.fn()

exports.mockInfo = jest.fn()
exports.mockWarn = jest.fn()
exports.mockError = jest.fn()

exports.mockLogger = () => {
    return {
        transports: {
            Console: () => {},
        },
        format,
        createLogger: () => ({
            info: exports.mockInfo,
            warn: exports.mockWarn,
            error: exports.mockError,
        }),
    }
}
