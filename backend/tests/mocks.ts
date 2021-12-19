import { getMockReq } from '@jest-mock/express'
import { MockRequest } from '@jest-mock/express/dist/src/request'
import { Request } from 'express'
import { ICommit } from '../../models/Commit'
import { FileType, IFileMeta } from '../../models/File'
import { IRepository } from '../../models/Repo'
import { User } from '../src/models/User'

export function mockReq<T extends Request>(req?: MockRequest): T {
  return getMockReq({
    params: { repo: 'repo', branch: 'branch', hash: 'hash' },
    query: { path: 'path' },
    ...req,
  })
}

export function mock(fn: unknown): jest.Mock {
  return fn as jest.Mock
}

export const mockUser1: User = {
  id: 1,
  username: 'user1',
  password: 'pass1',
  createdAt: new Date('2018-01-01T00:00:00.000Z'),
  updatedAt: new Date('2019-01-01T00:00:00.000Z'),
}

export const mockRepo1: IRepository = {
  name: 'repo1',
  updatedAt: '2019-01-01T00:00:00.000Z',
}

export const mockRepo2: IRepository = {
  name: 'repo2',
  updatedAt: '2020-01-01T00:00:00.000Z',
}

export const mockFile1: IFileMeta = {
  icon: 'icon',
  name: 'name1',
  path: 'path',
  type: FileType.FILE,
  lastCommit: {
    date: 'date',
    message: 'message',
  },
}

export const mockFile2: IFileMeta = {
  icon: 'icon',
  name: 'name2',
  path: 'path',
  type: FileType.FILE,
  lastCommit: {
    date: 'date',
    message: 'message',
  },
}

export const mockFile3: IFileMeta = {
  icon: 'icon',
  name: 'name3',
  path: 'path',
  type: FileType.FOLDER,
  lastCommit: {
    date: 'date',
    message: 'message',
  },
}

export const mockCommit1: ICommit = {
  hash: 'hash',
  author: 'author',
  date: 'date',
  message: 'message',
  parent: 'parent',
}
