import { IBreadcrumb, ICommit, IFile, IRepository, IRepositoryMeta } from '../../src/models/interfaces'

export const mockCommit: ICommit = {
  date: 'last commit date',
  hash: '01234567',
  fullHash: '0123456789abcdef',
  message: 'test commit message',
  author: 'test commit author',
  timestamp: 123456789,
}

export const mockRepository: IRepository = {
  name: 'test-repo',
  lastCommit: mockCommit,
}

export const mockBreadcrumb1: IBreadcrumb = {
  name: 'Path 1',
  path: 'path1',
  isActive: false,
}

export const mockBreadcrumb2: IBreadcrumb = {
  name: 'Path 2',
  path: 'path2',
  isActive: true,
}

export const mockRepositoryMeta: IRepositoryMeta = {
  name: 'test-repo',
  branch: 'test-branch-1',
  branches: ['test-branch-1', 'test-branch-2'],
  breadcrumb: [mockBreadcrumb1, mockBreadcrumb2],
  path: 'filepath',
}

export const mockFile: IFile = {
  icon: 'file-icon',
  lastCommit: mockCommit,
  name: 'file name',
  path: 'filepath',
  type: 'file',
}

export const mockPagination: {
  page: number
  maxPage: number
  first?: string
  previous?: string
  next?: string
  last?: string
} = {
  page: 5,
  maxPage: 8,
  first: '?page=1',
  previous: '?page=4',
  next: '?page=6',
  last: '?page=8',
}

export const mockUser1 = { id: 1, username: 'user1', password: 'pass1', createdAt: new Date(), updatedAt: new Date() }

export const mockUser2 = { id: 2, username: 'user2', password: 'pass2', createdAt: new Date(), updatedAt: new Date() }
