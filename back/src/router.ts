import { Router } from 'express'
import { getApp } from './controllers/app/getApp'
import { getBranches } from './controllers/branches/getBranches'
import { getCommit } from './controllers/commits/getCommit'
import { getCommits } from './controllers/commits/getCommits'
import { getRepos } from './controllers/repos/getRepos'
import { postRepo } from './controllers/repos/postRepo'
import { getServerUrl } from './controllers/server/getServerUrl'
import { getLogout } from './controllers/session/getLogout'
import { getSession } from './controllers/session/getSession'
import { postLogin } from './controllers/session/postLogin'
import { download } from './controllers/tree/download'
import { getTree } from './controllers/tree/getTree'
import { deleteUser } from './controllers/users/deleteUser'
import { getUsers } from './controllers/users/getUsers'
import { postUser } from './controllers/users/postUser'
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
