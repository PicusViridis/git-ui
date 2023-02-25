import { deserializeUser, localStrategy, serializeUser } from '../../../src/libs/passport'
import { prisma } from '../../../src/prisma'
import { mockUser1 } from '../../mocks'

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
      jest.spyOn(prisma.user, 'findUniqueOrThrow').mockResolvedValue(mockUser1)
      const done = jest.fn()
      await deserializeUser('user1', done)
      expect(prisma.user.findUniqueOrThrow).toHaveBeenCalledWith({ where: { username: 'user1' } })
      expect(done).toHaveBeenCalledWith(null, mockUser1)
    })

    it('should catch errors', async () => {
      jest.spyOn(prisma.user, 'findUniqueOrThrow').mockRejectedValue(new Error('500'))
      const done = jest.fn()
      await deserializeUser('user1', done)
      expect(done).toHaveBeenCalledWith(new Error('500'))
    })
  })

  describe('localStrategy', () => {
    it('should return user', async () => {
      jest.spyOn(prisma.user, 'findFirstOrThrow').mockResolvedValue(mockUser1)
      const done = jest.fn()
      await localStrategy('user1', 'tutu', done)
      expect(prisma.user.findFirstOrThrow).toHaveBeenCalledWith({
        where: {
          username: 'user1',
          password: 'eb0295d98f37ae9e95102afae792d540137be2dedf6c4b00570ab1d1f355d033',
        },
      })
      expect(done).toHaveBeenCalledWith(null, mockUser1)
    })

    it('should catch errors', async () => {
      jest.spyOn(prisma.user, 'findFirstOrThrow').mockRejectedValue(new Error('500'))
      const done = jest.fn()
      await localStrategy('user1', 'tutu', done)
      expect(done).toHaveBeenCalledWith(new Error('500'))
    })
  })
})
