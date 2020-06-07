const { mockContext } = require('../../mocks/context')
const { getLogin, postLogin, getLogout } = require('./session')

jest.mock('koa-passport', () => ({
    authenticate: () => (ctx) => (ctx.body = 'post login'),
}))

describe('session', () => {
    beforeEach(jest.resetAllMocks)

    describe('getLogin', () => {
        it('should render view with error', async () => {
            const ctx = mockContext()
            ctx.flash.mockReturnValue(['error'])
            await getLogin(ctx)
            expect(ctx.render).toHaveBeenCalledWith('Login', { error: 'error' })
        })
    })

    describe('postLogin', () => {
        it('should render view with files', async () => {
            const ctx = mockContext()
            await postLogin(ctx)
            expect(ctx.body).toBe('post login')
        })
    })

    describe('getLogout', () => {
        it('should render view with files', async () => {
            const ctx = mockContext()
            getLogout(ctx)
            expect(ctx.logout).toHaveBeenCalled()
            expect(ctx.redirect).toHaveBeenCalledWith('/')
        })
    })
})
