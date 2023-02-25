import { createHash } from 'crypto'
import { getRepository } from 'typeorm'
import { ISession } from '../../../models/Session'
import { User } from '../models/User'

export function serializeUser(user: ISession, done: (err: unknown, id?: string) => void): void {
  return done(null, user.username)
}

export function deserializeUser(username: string, done: (err: unknown, user?: ISession) => void): Promise<void> {
  return getRepository(User)
    .findOne({ where: { username } })
    .then((user) => {
      done(null, user)
    })
    .catch(done)
}

export function localStrategy(
  username: string,
  password: string,
  done: (error: unknown, user?: ISession) => void
): Promise<void> {
  return getRepository(User)
    .findOne({ where: { username, password: hashPass(password) } })
    .then((user) => {
      done(null, user)
    })
    .catch(done)
}

export function hashPass(password: string) {
  return createHash('sha256').update(password).digest('hex')
}
