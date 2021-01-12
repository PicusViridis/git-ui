import { getMockReq, getMockRes } from '@jest-mock/express'
import { Request, Response } from 'express'
import { getLogin, getLogout, postLogin } from '../../src/controllers/session'

const { res } = getMockRes()

jest.mock('passport', () => ({
  authenticate: () => (req: Request, res: Response) => res.json('post login mock'),
}))

describe('session', () => {
  beforeEach(jest.resetAllMocks)

  describe('getLogin', () => {
    it('should render view with error', async () => {
      const req = getMockReq()
      req.flash = jest.fn().mockReturnValue(['error'])
      getLogin(req, res)
      expect(res.render).toHaveBeenCalledWith('Login', { error: 'error' })
    })
  })

  describe('postLogin', () => {
    it('should use passport middleware', async () => {
      postLogin(getMockRes(), res)
      expect(res.json).toHaveBeenCalledWith('post login mock')
    })
  })

  describe('getLogout', () => {
    it('should render view with files', async () => {
      const req = getMockReq()
      req.logout = jest.fn()
      getLogout(req, res)
      expect(req.logout).toHaveBeenCalled()
      expect(res.redirect).toHaveBeenCalledWith('/')
    })
  })
})
