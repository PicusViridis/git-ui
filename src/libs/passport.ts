import sha256 from 'crypto-js/sha256'
import { User } from '../models/User'

export function serializeUser(user: User, done: (err: any, id?: string) => void): void {
  return done(null, user.username)
}

export function deserializeUser(
  username: string,
  done: (err: any, user?: { username: string }) => void
): Promise<void> {
  return User.getRepository()
    .findOne(username)
    .then((user) => {
      done(null, user)
    })
    .catch(done)
}

export function localStrategy(
  username: string,
  password: string,
  done: (error: any, user?: User) => void
): Promise<void> {
  return User.getRepository()
    .findOne({ where: { username, password: sha256(password).toString() } })
    .then((user) => {
      done(null, user)
    })
    .catch(done)
}
