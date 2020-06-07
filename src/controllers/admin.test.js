const { User } = require('../db')
const { mockContext } = require('../../mocks/context')
const { getAddUser, getDeleteUser, getListUsers, postAddUser } = require('./admin')

jest.mock('../db')

describe('admin', () => {
    beforeEach(jest.resetAllMocks)

    describe('getListUsers', () => {
        it('should send users to render', async () => {
            User.findAll.mockResolvedValue([{ username: 'toto' }])
            const ctx = mockContext()
            await getListUsers(ctx)
            expect(ctx.render).toHaveBeenCalledWith('admin/ListUsers', { users: [{ username: 'toto' }] })
        })
    })

    describe('getAddUser', () => {
        it('should render view', async () => {
            const ctx = mockContext()
            await getAddUser(ctx)
            expect(ctx.render).toHaveBeenCalledWith('admin/AddUser')
        })
    })

    describe('postAddUser', () => {
        it('should create user and redirect', async () => {
            const ctx = mockContext({ body: { username: 'toto', password: 'tutu' } })
            await postAddUser(ctx)
            expect(User.create).toHaveBeenCalledWith({
                username: 'toto',
                password: 'eb0295d98f37ae9e95102afae792d540137be2dedf6c4b00570ab1d1f355d033',
            })
            expect(ctx.redirect).toHaveBeenCalledWith('/admin')
        })
    })

    describe('getDeleteUser', () => {
        it('should delete user and redirect', async () => {
            const ctx = mockContext({ params: { username: 'toto' } })
            await getDeleteUser(ctx)
            expect(User.destroy).toHaveBeenCalledWith({ where: { username: 'toto' } })
            expect(ctx.redirect).toHaveBeenCalledWith('/admin')
        })
    })
})
