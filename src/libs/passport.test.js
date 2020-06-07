const { serializeUser, deserializeUser, localStrategy } = require('./passport')
const { User } = require('../db')

jest.mock('../db')

describe('passport', () => {
    beforeEach(jest.resetAllMocks)

    describe('serializeUser', () => {
        it('should return username', () => {
            const done = jest.fn()
            serializeUser({ username: 'toto' }, done)
            expect(done).toHaveBeenCalledWith(null, 'toto')
        })
    })

    describe('deserializeUser', () => {
        it('should return user', async () => {
            User.findByPk.mockResolvedValue({ username: 'toto' })
            const done = jest.fn()
            await deserializeUser('toto', done)
            expect(User.findByPk).toHaveBeenCalledWith('toto')
            expect(done).toHaveBeenCalledWith(null, { username: 'toto' })
        })

        it('should catch errors', async () => {
            User.findByPk.mockRejectedValue(new Error('500'))
            const done = jest.fn()
            await deserializeUser('toto', done)
            expect(done).toHaveBeenCalledWith(new Error('500'))
        })
    })

    describe('localStrategy', () => {
        it('should return user', async () => {
            User.findOne.mockResolvedValue({ username: 'toto' })
            const done = jest.fn()
            await localStrategy('toto', 'tutu', done)
            expect(User.findOne).toHaveBeenCalledWith({
                where: {
                    username: 'toto',
                    password: 'eb0295d98f37ae9e95102afae792d540137be2dedf6c4b00570ab1d1f355d033',
                },
            })
            expect(done).toHaveBeenCalledWith(null, { username: 'toto' })
        })

        it('should return false if no user was found', async () => {
            User.findOne.mockResolvedValue()
            const done = jest.fn()
            await localStrategy('toto', 'tutu', done)
            expect(done).toHaveBeenCalledWith(null, false)
        })

        it('should catch errors', async () => {
            User.findOne.mockRejectedValue(new Error('500'))
            const done = jest.fn()
            await localStrategy('toto', 'tutu', done)
            expect(done).toHaveBeenCalledWith(new Error('500'))
        })
    })
})
