import { Router } from 'express'
import { getApp } from './controllers/app'
import { getBranches } from './controllers/branches'
import { getCommit, getCommits } from './controllers/commits'
import { getRepos, postRepo } from './controllers/repos'
import { getServerUrl } from './controllers/server'
import { getLogout, getSession, postLogin } from './controllers/session'
import { download, getTree } from './controllers/tree'
import { deleteUser, getUsers, postUser } from './controllers/users'
import { hasSession } from './middlewares/session'

export const router = Router()

router.post('/login', postLogin)
router.get('/app', getApp)

router.use(hasSession())

router.get('/session', getSession)
router.get('/logout', getLogout)

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
