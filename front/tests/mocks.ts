import { IPagination } from '@saramorillon/hooks'
import { act } from 'react-dom/test-utils'
import { useNavigate } from 'react-router-dom'
import { IApp } from '../src/models/App'
import { IBranch } from '../src/models/Branch'
import { ICommit, ICommitDiff } from '../src/models/Commit'
import { IFile, IFileMeta } from '../src/models/File'
import { IRepository } from '../src/models/Repo'
import { ISession } from '../src/models/Session'
import { IUser } from '../src/models/User'

export async function wait() {
  await act(() => new Promise((resolve) => setTimeout(resolve, 0)))
}

const { location } = window

export function mockLocation(fns: Partial<Location>): void {
  Object.defineProperty(window, 'location', { value: { ...location, ...fns }, writable: false })
}

export function restoreLocation(): void {
  Object.defineProperty(window, 'location', { value: location, writable: false })
}

export function mockNavigate(): jest.Mock {
  const navigate = jest.fn()
  jest.mocked(useNavigate).mockReturnValue(navigate)
  return navigate
}

export function mockSession(session: Partial<ISession> = {}): ISession {
  return {
    username: 'username',
    ...session,
  }
}

export function mockApp(app: Partial<IApp> = {}): IApp {
  return {
    name: 'name',
    version: 'version',
    author: {
      name: 'author name',
      url: 'author url',
    },
    repository: {
      url: 'repository url',
    },
    ...app,
  }
}

export function mockUser(user: Partial<IUser> = {}): IUser {
  return {
    id: 1,
    username: 'user1',
    createdAt: '2018-01-01 00:00:00',
    ...user,
  }
}

export function mockRepo(repo: Partial<IRepository> = {}): IRepository {
  return {
    name: 'repo1',
    updatedAt: '2019-01-01 00:00:00',
    ...repo,
  }
}

export function mockBranch(branch: Partial<IBranch> = {}): IBranch {
  return {
    name: 'branch',
    lastCommit: {
      date: '2019-01-01 00:00:00',
      message: 'message1',
    },
    ...branch,
  }
}

export function mockFileMeta(fileMeta: Partial<IFileMeta> = {}): IFileMeta {
  return {
    icon: 'icon1',
    name: 'name1',
    path: 'path1',
    type: 'file',
    lastCommit: {
      date: '2019-01-01 00:00:00',
      message: 'message1',
    },
    ...fileMeta,
  }
}

export function mockFile(file: Partial<IFile> = {}): IFile {
  return {
    content: 'content',
    size: 1025486,
    ...file,
  }
}

export function mockCommit(commit: Partial<ICommit> = {}): ICommit {
  return {
    hash: 'hash1',
    author: 'author1',
    date: '2019-01-01 00:00:00',
    message: 'message1',
    parent: 'parent1',
    ...commit,
  }
}

export function mockCommitDiff(commitDiff: Partial<ICommitDiff> = {}): ICommitDiff {
  return {
    message: 'message',
    diff: [
      {
        name: 'file.txt',
        status: 'changed',
        lines: [{ left: { t: 'remove', n: 1, v: 'removed line' }, right: { t: 'add', n: 1, v: 'added line' } }],
      },
    ],
    ...commitDiff,
  }
}

export function mockPagination(pagination?: Partial<IPagination>): IPagination {
  return {
    page: 1,
    first: jest.fn(),
    previous: jest.fn(),
    next: jest.fn(),
    last: jest.fn(),
    canPrevious: false,
    canNext: false,
    goTo: jest.fn(),
    ...pagination,
  }
}
