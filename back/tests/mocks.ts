import { getMockReq as _getMockReq } from '@jest-mock/express'
import { User } from '@prisma/client'
import { Logger } from '@saramorillon/logger'
import { Session, SessionData } from 'express-session'
import { ICommit } from '../src/models/Commit'
import { IFileMeta } from '../src/models/File'
import { IRepository } from '../src/models/Repo'

export function getMockReq(...params: Parameters<typeof _getMockReq>): ReturnType<typeof _getMockReq> {
  const req = _getMockReq(...params)
  req.session = {} as Session
  req.logger = new Logger({ silent: true })
  return req
}

export function mockAction(logger: Logger) {
  const action = { success: jest.fn(), failure: jest.fn() }
  logger.start = jest.fn().mockReturnValue(action)
  return action
}

export function mockSession(session: Partial<SessionData['user']> = {}): SessionData['user'] {
  return {
    username: 'username',
    ...session,
  }
}

export function mockUser(user: Partial<User> = {}): User {
  return {
    id: 1,
    username: 'username',
    password: 'password',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...user,
  }
}

export function mockRepo(repo: Partial<IRepository> = {}): IRepository {
  return {
    name: 'repo1',
    updatedAt: '2019-01-01T00:00:00.000Z',
    ...repo,
  }
}

export function mockFile(file: Partial<IFileMeta> = {}): IFileMeta {
  return {
    icon: 'icon',
    name: 'name1',
    path: 'path',
    type: 'file',
    lastCommit: {
      date: 'date',
      message: 'message',
    },
    ...file,
  }
}

export function mockCommit(commit: Partial<ICommit> = {}): ICommit {
  return {
    hash: 'hash',
    author: 'author',
    date: 'date',
    message: 'message',
    parent: 'parent',
    ...commit,
  }
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
