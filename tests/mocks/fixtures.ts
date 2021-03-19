import { User } from '@/models/User'

export const mockUser1: User = {
  id: 1,
  username: 'user1',
  password: 'pass1',
  createdAt: new Date('2018-01-01T00:00:00.000Z'),
  updatedAt: new Date('2019-01-01T00:00:00.000Z'),
}

export const mockUser2: User = {
  id: 2,
  username: 'user2',
  password: 'pass2',
  createdAt: new Date('2018-01-01T00:00:00.000Z'),
  updatedAt: new Date('2019-01-01T00:00:00.000Z'),
}
