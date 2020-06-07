const { mockContext } = require('../../mocks/context')
const { render } = require('./render')

jest.mock('react')
jest.mock('react-dom/server')

describe('render', () => {
    it('should add render function to ctx', () => {
        const ctx = mockContext()
        render({})(ctx, jest.fn())
        expect(ctx.render).toEqual(expect.any(Function))
    })
})
