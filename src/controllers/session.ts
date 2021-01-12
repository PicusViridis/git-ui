import { Request, Response } from 'express'
import passport from 'passport'

export function getLogin(req: Request, res: Response): void {
  const [error] = req.flash('error')
  return res.render('Login', { error })
}

export const postLogin = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: 'Invalid credentials',
})

export function getLogout(req: Request, res: Response): void {
  req.logout()
  res.redirect('/')
}
