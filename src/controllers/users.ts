import sha256 from 'crypto-js/sha256'
import { Request, Response } from 'express'
import { User } from '../models/User'

export async function getUsers(req: Request, res: Response): Promise<void> {
  const users = await User.getRepository().find({ order: { username: 'ASC' } })
  res.render('Users/Users', { users })
}

export async function addUser(req: Request, res: Response): Promise<void> {
  res.render('Users/User')
}

export async function postUser(req: Request, res: Response): Promise<void> {
  const { username, password } = req.body
  await User.getRepository().save({ username, password: sha256(password).toString() })
  res.redirect('/users/list')
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
  const { username } = req.params
  await User.getRepository().delete(username)
  res.redirect('/users/list')
}
