import { getMockReq } from '@jest-mock/express'
import { MockRequest } from '@jest-mock/express/dist/src/request'
import { User } from '@prisma/client'
import { Request } from 'express'
import { ICommit } from '../src/models/Commit'
import { FileType, IFileMeta } from '../src/models/File'
import { IRepository } from '../src/models/Repo'

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

export const test = `diff --git a/file.txt b/file.txt
index hash1..hash2 100000
--- a/file.txt
+++ b/file.txt
@@ -1,1 +1,1 @@
-removed line
+added line
 context line
`
