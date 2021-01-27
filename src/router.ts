import { Router } from 'express'
import { getBoard } from './controllers/board/getBoard'
import { getCommit } from './controllers/commits/getCommit'
import { getCommits } from './controllers/commits/getCommits'
import { downloadFile } from './controllers/files/downloadFile'
import { getFile } from './controllers/files/getFile'
import { getHome } from './controllers/home/getHome'
import { deleteIssue } from './controllers/issues/deleteIssue'
import { getIssue } from './controllers/issues/getIssue'
import { getIssues } from './controllers/issues/getIssues'
import { moveIssue } from './controllers/issues/moveIssue'
import { saveIssue } from './controllers/issues/saveIssue'
import { deleteRelease } from './controllers/releases/deleteRelease'
import { getRelease } from './controllers/releases/getRelease'
import { getReleases } from './controllers/releases/getReleases'
import { saveRelease } from './controllers/releases/saveRelease'
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

router.get('/users/list', getUsers)
router.get('/users/add', addUser)
router.post('/users/add', postUser)
router.get('/users/delete/:id', deleteUser)

router.use('/repo/:repo/issues', repo('issues'))
router.get('/repo/:repo/issues/list', getIssues)
router.get('/repo/:repo/issues/edit/:id?', getIssue)
router.post('/repo/:repo/issues/edit/:id?', saveIssue)
router.post('/repo/:repo/issues/move/:id?', moveIssue)
router.get('/repo/:repo/issues/delete/:id', deleteIssue)

router.use('/repo/:repo/releases', repo('releases'))
router.get('/repo/:repo/releases/list', getReleases)
router.get('/repo/:repo/releases/edit/:id?', getRelease)
router.post('/repo/:repo/releases/edit/:id?', saveRelease)
router.get('/repo/:repo/releases/delete/:id', deleteRelease)

router.use('/repo/:repo/board', repo('board'))
router.get('/repo/:repo/board', getBoard)

router.use('/repo/:repo/:branch/files', repo('files'))
router.get('/repo/:repo/:branch/files', getFile)
router.get('/repo/:repo/:branch/files/download', downloadFile)

router.use('/repo/:repo/:branch/commits', repo('commits'))
router.get('/repo/:repo/:branch/commits', getCommits)
router.get('/repo/:repo/:branch/commits/:hash', getCommit)
