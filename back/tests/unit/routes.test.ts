import { Router } from 'express'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getApp } from '../../src/controllers/app'
import { deleteBranch, getBranches } from '../../src/controllers/branches'
import { getCommit, getCommits } from '../../src/controllers/commits'
import { getRepos, postRepo } from '../../src/controllers/repos'
import { getServerUrl } from '../../src/controllers/server'
import { getSession, login, logout } from '../../src/controllers/session'
import { download, getTree } from '../../src/controllers/tree'
import { deleteUser, getUsers, postUser } from '../../src/controllers/users'
import { session } from '../../src/middlewares/session'
import { routes } from '../../src/routes'

vi.mock('express')
vi.mock('../../src/controllers/app')
vi.mock('../../src/controllers/session')
vi.mock('../../src/middlewares/session')

function mockRouter() {
  return {
    use: vi.fn(),
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  } as unknown as Router
}

describe('routes', () => {
  beforeEach(() => {
    vi.mocked(Router).mockReturnValue(mockRouter())
  })

  it('should create routes', () => {
    const router = routes()
    expect(router.post).toHaveBeenCalledWith('/login', login)
    expect(router.get).toHaveBeenCalledWith('/app', getApp)
    expect(router.use).toHaveBeenCalledWith(session)
    expect(router.get).toHaveBeenCalledWith('/session', getSession)
    expect(router.get).toHaveBeenCalledWith('/logout', logout)
    expect(router.get).toHaveBeenCalledWith('/serverurl', getServerUrl)
    expect(router.get).toHaveBeenCalledWith('/repositories', getRepos)
    expect(router.post).toHaveBeenCalledWith('/repositories', postRepo)
    expect(router.get).toHaveBeenCalledWith('/users', getUsers)
    expect(router.post).toHaveBeenCalledWith('/users', postUser)
    expect(router.delete).toHaveBeenCalledWith('/users/:username', deleteUser)
    expect(router.get).toHaveBeenCalledWith('/repo/:repo/branches', getBranches)
    expect(router.delete).toHaveBeenCalledWith('/repo/:repo/branches/:name', deleteBranch)
    expect(router.get).toHaveBeenCalledWith('/repo/:repo/:branch/tree', getTree)
    expect(router.get).toHaveBeenCalledWith('/repo/:repo/:branch/download', download)
    expect(router.get).toHaveBeenCalledWith('/repo/:repo/:branch/commits', getCommits)
    expect(router.get).toHaveBeenCalledWith('/repo/:repo/:branch/commits/:hash', getCommit)
  })

  it('should return router', () => {
    const routerMock = mockRouter()
    vi.mocked(Router).mockReturnValue(routerMock)
    const router = routes()
    expect(router).toBe(routerMock)
  })
})
