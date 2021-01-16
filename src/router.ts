import { Router } from 'express'
import { getHome } from './controllers/home'
import {
  getAddIssue,
  getDeleteIssue,
  getEditIssue,
  getListIssues,
  postAddIssue,
  postEditIssue,
} from './controllers/issues'
import { downloadFile, getCommit, getCommits, getFile, getFiles } from './controllers/repo'
import { getLogin, getLogout, postLogin } from './controllers/session'
import { getAddUser, getDeleteUser, getListUsers, postAddUser } from './controllers/users'
import { repo } from './middlewares/repo'
import { hasSession } from './middlewares/session'

export const router = Router()

router.get('/login', getLogin)
router.post('/login', postLogin)

router.use(hasSession())

router.get('/', getHome)
router.get('/logout', getLogout)

router.get('/users/list', getListUsers)
router.get('/users/add', getAddUser)
router.post('/users/add', postAddUser)
router.get('/users/delete/:id', getDeleteUser)

router.get('/files', repo(), getFiles)
router.get('/file', repo(), getFile)
router.get('/file/download', repo(), downloadFile)

router.get('/commits', repo(), getCommits)
router.get('/commit/:hash', repo(), getCommit)

router.get('/issues/list', getListIssues)
router.get('/issues/add', getAddIssue)
router.post('/issues/add', postAddIssue)
router.get('/issues/edit/:id', getEditIssue)
router.post('/issues/edit/:id', postEditIssue)
router.get('/issues/delete/:id', getDeleteIssue)
