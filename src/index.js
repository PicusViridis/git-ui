const path = require('path')
const Koa = require('koa')
const flash = require('koa-better-flash')
const bodyParser = require('koa-body')
const helmet = require('koa-helmet')
const session = require('koa-session')
const serve = require('koa-static')

const { config } = require('./config')
const { appLogger, logger } = require('./middlewares/logger')
const { passport } = require('./middlewares/passport')
const { render } = require('./middlewares/render')
const { router } = require('./router')

require('./db')

const app = new Koa()

app.keys = config.keys

app.use(render({ root: path.join(__dirname, 'views'), ext: 'jsx', cache: false, layout: 'Layout' }))
app.use(serve(path.join(__dirname, 'public')))
app.use(logger())
app.use(helmet())
app.use(bodyParser())
app.use(session(app))
app.use(flash())
passport(app)
app.use(router.routes())

app.listen(config.port, () => {
    appLogger.info('app_start', { port: config.port })
})

require('@babel/register')
