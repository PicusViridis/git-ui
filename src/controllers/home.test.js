const { mockContext } = require('../../mocks/context')
const { getHome } = require('./home')
const { listRepositories } = require('../libs/repositories')

jest.mock('../libs/repositories')

describe('home', () => {
    beforeEach(jest.resetAllMocks)

    describe('getHome', () => {
        it('should render view with repositories', async () => {
            listRepositories.mockResolvedValue([{ name: 'repo' }])
            const ctx = mockContext()
            await getHome(ctx)
            expect(ctx.render).toHaveBeenCalledWith('Home', { repositories: [{ name: 'repo' }] })
        })
    })
})
