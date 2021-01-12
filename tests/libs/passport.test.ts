import { deserializeUser, localStrategy, serializeUser } from '../../src/libs/passport'
import { User } from '../../src/models/User'

jest.mock('../../src/models/User')

const mockedRepository = User.getRepository as jest.Mock

describe('passport', () => {
  beforeEach(jest.resetAllMocks)

  describe('serializeUser', () => {
    it('should return username', () => {
      const done = jest.fn()
      serializeUser({ username: 'toto', password: 'tutu' }, done)
      expect(done).toHaveBeenCalledWith(null, 'toto')
    })
  })

  describe('deserializeUser', () => {
    it('should return user', async () => {
      const findOne = jest.fn().mockResolvedValue({ username: 'toto', password: 'tutu' })
      mockedRepository.mockReturnValue({ findOne })
      const done = jest.fn()
      await deserializeUser('toto', done)
      expect(findOne).toHaveBeenCalledWith('toto')
      expect(done).toHaveBeenCalledWith(null, { username: 'toto', password: 'tutu' })
    })

    it('should catch errors', async () => {
      const findOne = jest.fn().mockRejectedValue(new Error('500'))
      mockedRepository.mockReturnValue({ findOne })
      const done = jest.fn()
      await deserializeUser('toto', done)
      expect(done).toHaveBeenCalledWith(new Error('500'))
    })
  })

  describe('localStrategy', () => {
    it('should return user', async () => {
      const findOne = jest.fn().mockResolvedValue({ username: 'toto', password: 'tutu' })
      mockedRepository.mockReturnValue({ findOne })
      const done = jest.fn()
      await localStrategy('toto', 'tutu', done)
      expect(findOne).toHaveBeenCalledWith({
        where: {
          username: 'toto',
          password: 'eb0295d98f37ae9e95102afae792d540137be2dedf6c4b00570ab1d1f355d033',
        },
      })
      expect(done).toHaveBeenCalledWith(null, { username: 'toto', password: 'tutu' })
    })

    it('should return false if no user was found', async () => {
      const findOne = jest.fn().mockResolvedValue(null)
      mockedRepository.mockReturnValue({ findOne })
      const done = jest.fn()
      await localStrategy('toto', 'tutu', done)
      expect(done).toHaveBeenCalledWith(null, null)
    })

    it('should catch errors', async () => {
      const findOne = jest.fn().mockRejectedValue(new Error('500'))
      mockedRepository.mockReturnValue({ findOne })
      const done = jest.fn()
      await localStrategy('toto', 'tutu', done)
      expect(done).toHaveBeenCalledWith(new Error('500'))
    })
  })
})
