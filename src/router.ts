import { Router } from 'express'
import { getCommit, getCommits } from './controllers/commits'
import { downloadFile, getFile, getFiles } from './controllers/files'
import { getHome } from './controllers/home'
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

router.get('/files', repo(), getFiles)
router.get('/file', repo(), getFile)
router.get('/file/download', repo(), downloadFile)

router.get('/commits', repo(), getCommits)
router.get('/commit/:hash', repo(), getCommit)
