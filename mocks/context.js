exports.mockContext = function ({ body = {}, params = {}, query = {}, ...otherParams } = {}) {
    return {
        ...otherParams,
        params,
        query,
        request: { body },
        render: jest.fn(),
        redirect: jest.fn(),
        set: jest.fn(),
        flash: jest.fn(),
        logout: jest.fn(),
        isAuthenticated: jest.fn(),
    }
}
