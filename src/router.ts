import { Router } from 'express'
import { getAddUser, getDeleteUser, getListUsers, postAddUser } from './controllers/admin'
import { getHome } from './controllers/home'
import { downloadFile, getCommit, getCommits, getFile, getFiles } from './controllers/repo'
import { getLogin, getLogout, postLogin } from './controllers/session'
import { repo } from './middlewares/repo'
import { hasSession } from './middlewares/session'

export const router = Router()

router.get('/login', getLogin)
router.post('/login', postLogin)

router.use(hasSession())

router.get('/', getHome)
router.get('/logout', getLogout)
router.get('/admin', getListUsers)
router.get('/admin/add-user', getAddUser)
router.post('/admin/add-user', postAddUser)
router.get('/admin/delete-user/:username', getDeleteUser)

router.use('/repo/:repo/:active/:branch?', repo())
router.get('/repo/:repo/files/:branch?', getFiles)
router.get('/repo/:repo/file/:branch?', getFile)
router.get('/repo/:repo/download/:branch?', downloadFile)
router.get('/repo/:repo/commits/:branch?', getCommits)
router.get('/repo/:repo/commit/:hash', getCommit)
