import { User } from '@prisma/client'
import { Logger } from '@saramorillon/logger'
import { NextFunction, Request, Response } from 'express'
import { Session, SessionData } from 'express-session'
import { vi } from 'vitest'
import { ICommit } from '../src/models/Commit'
import { IFileMeta } from '../src/models/File'
import { IRepository } from '../src/models/Repo'

export function getMockReq(request: Partial<Request> = {}): Request {
  return {
    params: {},
    query: {},
    body: {},
    session: {} as Session,
    logger: new Logger({ silent: true }),
    ...request,
  } as never
}

export function getMockRes(response: Partial<Response> = {}): { res: Response; next: NextFunction } {
  return {
    res: {
      set: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis(),
      sendStatus: vi.fn().mockReturnThis(),
      sendFile: vi.fn().mockReturnThis(),
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      clearCookie: vi.fn().mockReturnThis(),
      redirect: vi.fn().mockReturnThis(),
      ...response,
    } as never,
    next: vi.fn() as never,
  }
}

export function mockAction(logger: Logger) {
  const action = { success: vi.fn(), failure: vi.fn() }
  logger.start = vi.fn().mockReturnValue(action)
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
