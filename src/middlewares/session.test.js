const { mockContext } = require('../../mocks/context')
const { hasSession } = require('./session')

describe('session', () => {
    it('should call next if ctx is authenticated', async () => {
        const ctx = mockContext()
        ctx.isAuthenticated.mockReturnValue(true)
        const next = jest.fn()
        await hasSession()(ctx, next)
        expect(next).toHaveBeenCalled()
    })

    it('should redirect if ctx is not authenticated', async () => {
        const ctx = mockContext()
        ctx.isAuthenticated.mockReturnValue(false)
        await hasSession()(ctx, jest.fn())
        expect(ctx.redirect).toHaveBeenCalledWith('/login')
    })
})
