import { Router } from 'express'
import { getCommit, getCommits } from './controllers/commits'
import { downloadFile, getFile } from './controllers/files'
import { getHome } from './controllers/home'
import { addIssue, deleteIssue, getIssue, getIssues, postIssue, putIssue } from './controllers/issues'
import { getLogin, getLogout, postLogin } from './controllers/session'
import { addUser, deleteUser, getUsers, postUser } from './controllers/users'
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
router.get('/repo/:repo/issues/add', addIssue)
router.post('/repo/:repo/issues/add', postIssue)
router.get('/repo/:repo/issues/edit/:id', getIssue)
router.post('/repo/:repo/issues/edit/:id', putIssue)
router.get('/repo/:repo/issues/delete/:id', deleteIssue)

router.use('/repo/:repo/:branch/files', repo('files'))

router.get('/repo/:repo/:branch/files', getFile)
router.get('/repo/:repo/:branch/files/download', downloadFile)

router.use('/repo/:repo/:branch/commits', repo('commits'))

router.get('/repo/:repo/:branch/commits', getCommits)
router.get('/repo/:repo/:branch/commits/:hash', getCommit)
