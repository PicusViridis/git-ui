const { listBranches, getBreadcrumb } = require('../libs/repositories')
const { mockContext } = require('../../mocks/context')
const { repo } = require('./repo')

jest.mock('../libs/repositories')

describe('repo', () => {
    it('should add repo information to state', async () => {
        listBranches.mockResolvedValue(['branch1', 'branch2'])
        getBreadcrumb.mockReturnValue(['bread', 'crumb'])
        const ctx = mockContext({ state: {}, params: { repo: 'repo', branch: 'branch' }, query: { path: 'path' } })
        await repo()(ctx, jest.fn())
        expect(ctx.state).toEqual({
            repo: {
                name: 'repo',
                path: 'path',
                branch: 'branch',
                branches: ['branch1', 'branch2'],
                breadcrumb: ['bread', 'crumb'],
            },
        })
    })
})
