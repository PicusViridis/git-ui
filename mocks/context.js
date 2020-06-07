exports.mockContext = function ({ body = {}, ...allParams } = {}) {
    return {
        ...allParams,
        request: { body },
        render: jest.fn(),
        redirect: jest.fn(),
        set: jest.fn(),
        flash: jest.fn(),
        logout: jest.fn(),
        isAuthenticated: jest.fn(),
    }
}
