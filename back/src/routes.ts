import { Router } from 'express'
import { getApp } from './controllers/app'
import { getBranches } from './controllers/branches'
import { getCommit, getCommits } from './controllers/commits'
import { getRepos, postRepo } from './controllers/repos'
import { getServerUrl } from './controllers/server'
import { getSession, login, logout } from './controllers/session'
import { download, getTree } from './controllers/tree'
import { deleteUser, getUsers, postUser } from './controllers/users'
import { session } from './middlewares/session'

export function routes() {
  const router = Router()

  router.post('/login', login)
  router.get('/app', getApp)

  router.use(session)

  router.get('/session', getSession)
  router.get('/logout', logout)

  router.get('/serverurl', getServerUrl)

  router.get('/repositories', getRepos)
  router.post('/repositories', postRepo)

  router.get('/users', getUsers)
  router.post('/users', postUser)
  router.delete('/users/:username', deleteUser)

  router.get('/repo/:repo/branches', getBranches)

  router.get('/repo/:repo/:branch/tree', getTree)
  router.get('/repo/:repo/:branch/download', download)

  router.get('/repo/:repo/:branch/commits', getCommits)
  router.get('/repo/:repo/:branch/commits/:hash', getCommit)

  return router
}
