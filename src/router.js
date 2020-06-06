const Router = require('@koa/router')
const { getListUsers, getAddUser, getDeleteUser, postAddUser } = require('./controllers/admin')
const { getHome } = require('./controllers/home')
const { getFiles, getFile, downloadFile, getCommits, getCommit } = require('./controllers/repo')
const { getLogin, postLogin, getLogout } = require('./controllers/session')
const { hasSession } = require('./middlewares/session')
const { repo } = require('./middlewares/repo')

const router = new Router()

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

exports.router = router
