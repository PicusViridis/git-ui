import { Router } from 'express'
import { getCommit } from './controllers/commits/getCommit'
import { getCommits } from './controllers/commits/getCommits'
import { downloadFile } from './controllers/files/downloadFile'
import { getFile } from './controllers/files/getFile'
import { getHome } from './controllers/home/getHome'
import { addRepo } from './controllers/repos/addRepo'
import { postRepo } from './controllers/repos/postRepo'
import { getLogin } from './controllers/session/getLogin'
import { getLogout } from './controllers/session/getLogout'
import { postLogin } from './controllers/session/postLogin'
import { addUser } from './controllers/users/addUser'
import { deleteUser } from './controllers/users/deleteUser'
import { getUsers } from './controllers/users/getUsers'
import { postUser } from './controllers/users/postUser'
import { repo } from './middlewares/repo'
import { hasSession } from './middlewares/session'

export const router = Router()

router.get('/login', getLogin)
router.post('/login', postLogin)

router.use(hasSession())

router.get('/', getHome)
router.get('/logout', getLogout)

router.get('/repos/add', addRepo)
router.post('/repos/add', postRepo)

router.get('/users/list', getUsers)
router.get('/users/add', addUser)
router.post('/users/add', postUser)
router.get('/users/delete/:id', deleteUser)

router.use('/repo/:repo/:branch/files', repo('files'))
router.get('/repo/:repo/:branch/files', getFile)
router.get('/repo/:repo/:branch/files/download', downloadFile)

router.use('/repo/:repo/:branch/commits', repo('commits'))
router.get('/repo/:repo/:branch/commits', getCommits)
router.get('/repo/:repo/:branch/commits/:hash', getCommit)
