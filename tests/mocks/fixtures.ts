import { Issue } from '../../src/models/Issue'
import { Release } from '../../src/models/Release'
import { User } from '../../src/models/User'

export const mockUser1: User = {
  id: 1,
  username: 'user1',
  password: 'pass1',
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const mockUser2: User = {
  id: 2,
  username: 'user2',
  password: 'pass2',
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const mockRelease: Release = {
  id: 1,
  name: 'release1',
  repo: 'repo',
  issues: [],
  dueDate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const mockIssue1: Issue = {
  id: 1,
  title: 'title1',
  description: 'description1',
  author: mockUser1,
  points: 5,
  priority: 1,
  release: mockRelease,
  repo: 'repo',
  status: 'doing',
  type: 'bug',
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const mockIssue2: Issue = {
  id: 2,
  title: 'title2',
  description: 'description2',
  author: mockUser2,
  points: 3,
  priority: 2,
  release: mockRelease,
  repo: 'repo',
  status: 'to do',
  type: 'feature',
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const mockIssue3: Issue = {
  id: 1,
  title: 'title1',
  description: 'a'.repeat(100),
  author: mockUser1,
  points: 5,
  priority: 1,
  release: mockRelease,
  repo: 'repo',
  status: 'doing',
  type: 'bug',
  createdAt: new Date(),
  updatedAt: new Date(),
}
