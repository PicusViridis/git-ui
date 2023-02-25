import { getRepository } from 'typeorm'
import { deserializeUser, localStrategy, serializeUser } from '../../../src/libs/passport'
import { mock, mockUser1 } from '../../mocks'

jest.mock('typeorm', () => ({ ...jest.requireActual('typeorm'), getRepository: jest.fn() }))

describe('passport', () => {
  describe('serializeUser', () => {
    it('should return username', () => {
      const done = jest.fn()
      serializeUser(mockUser1, done)
      expect(done).toHaveBeenCalledWith(null, 'user1')
    })
  })

  describe('deserializeUser', () => {
    it('should return user', async () => {
      const findOne = jest.fn().mockResolvedValue(mockUser1)
      mock(getRepository).mockReturnValue({ findOne })
      const done = jest.fn()
      await deserializeUser('user1', done)
      expect(findOne).toHaveBeenCalledWith({ where: { username: 'user1' } })
      expect(done).toHaveBeenCalledWith(null, mockUser1)
    })

    it('should catch errors', async () => {
      const findOne = jest.fn().mockRejectedValue(new Error('500'))
      mock(getRepository).mockReturnValue({ findOne })
      const done = jest.fn()
      await deserializeUser('user1', done)
      expect(done).toHaveBeenCalledWith(new Error('500'))
    })
  })

  describe('localStrategy', () => {
    it('should return user', async () => {
      const findOne = jest.fn().mockResolvedValue(mockUser1)
      mock(getRepository).mockReturnValue({ findOne })
      const done = jest.fn()
      await localStrategy('user1', 'tutu', done)
      expect(findOne).toHaveBeenCalledWith({
        where: {
          username: 'user1',
          password: 'eb0295d98f37ae9e95102afae792d540137be2dedf6c4b00570ab1d1f355d033',
        },
      })
      expect(done).toHaveBeenCalledWith(null, mockUser1)
    })

    it('should return false if no user was found', async () => {
      const findOne = jest.fn().mockResolvedValue(null)
      mock(getRepository).mockReturnValue({ findOne })
      const done = jest.fn()
      await localStrategy('user1', 'tutu', done)
      expect(done).toHaveBeenCalledWith(null, null)
    })

    it('should catch errors', async () => {
      const findOne = jest.fn().mockRejectedValue(new Error('500'))
      mock(getRepository).mockReturnValue({ findOne })
      const done = jest.fn()
      await localStrategy('user1', 'tutu', done)
      expect(done).toHaveBeenCalledWith(new Error('500'))
    })
  })
})
