const path = require('path')
const Koa = require('koa')
const flash = require('koa-better-flash')
const bodyParser = require('koa-body')
const helmet = require('koa-helmet')
const passport = require('koa-passport')
const session = require('koa-session')
const serve = require('koa-static')

const { Strategy } = require('passport-local')
const { serializeUser, deserializeUser, localStrategy } = require('./libs/passport')

const { config } = require('./config')
const { router } = require('./router')
require('./db')

const { appLogger, logger } = require('./middlewares/logger')
const { render } = require('./middlewares/render')

passport.serializeUser(serializeUser)
passport.deserializeUser(deserializeUser)
passport.use(new Strategy(localStrategy))

const app = new Koa()
app.keys = config.keys
app.use(render({ root: path.join(__dirname, 'views'), ext: 'jsx', cache: false, layout: 'Layout' }))
app.use(serve(path.join(__dirname, 'public')))
app.use(logger())
app.use(helmet())
app.use(bodyParser())
app.use(session(app))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(router.routes())
app.listen(config.port, () => {
    appLogger.info('app_start', { port: config.port })
})

require('@babel/register')
