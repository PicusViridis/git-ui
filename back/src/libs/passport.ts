import { createHash } from 'crypto'
import { ISession } from '../models/Session'
import { prisma } from '../prisma'

export function serializeUser(user: ISession, done: (err: unknown, id?: string) => void): void {
  return done(null, user.username)
}

export function deserializeUser(username: string, done: (err: unknown, user?: ISession) => void): Promise<void> {
  return prisma.user
    .findUniqueOrThrow({ where: { username } })
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
  return prisma.user
    .findFirstOrThrow({ where: { username, password: hashPass(password) } })
    .then((user) => {
      done(null, user)
    })
    .catch(done)
}

export function hashPass(password: string) {
  return createHash('sha256').update(password).digest('hex')
}
