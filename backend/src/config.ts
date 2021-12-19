import { bool, cleanEnv, num, str } from 'envalid'
import session, { SessionOptions } from 'express-session'
import filestore from 'session-file-store'

const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production'] }),
  APP_KEY: str(),
  APP_PORT: num({ default: 80 }),
  SESSION_DIR: str(),
  REPO_DIR: str(),
  COOKIE_DOMAIN: str(),
  SERVER_URL: str(),
  LOG_SILENT: bool({ default: false }),
})

interface IConfig {
  environment?: string
  port: number
  keys: string[]
  session: SessionOptions
  repoDir: string
  serverUrl: string
  logSilent: boolean
}

const FileStore = filestore(session)

export const config: IConfig = {
  environment: env.NODE_ENV,
  port: env.APP_PORT,
  keys: [env.APP_KEY],
  session: {
    secret: [env.APP_KEY],
    resave: false,
    saveUninitialized: false,
    store: new FileStore({ path: env.SESSION_DIR }),
    name: 'sid',
    cookie: { domain: env.COOKIE_DOMAIN, httpOnly: false, secure: false },
  },
  repoDir: env.REPO_DIR,
  serverUrl: env.SERVER_URL,
  logSilent: env.LOG_SILENT,
}
