import { getMockReq, getMockRes } from '@jest-mock/express'
import { getLogout, getSession } from '../../../src/controllers/session'

describe('getSession', () => {
  it('should return user', () => {
    const req = getMockReq()
    req.user = { username: 'username' }
    const { res } = getMockRes()
    getSession(req, res)
    expect(res.json).toHaveBeenCalledWith({ username: 'username' })
  })

  it('should send 500 status when failure', () => {
    const req = getMockReq()
    const { res } = getMockRes()
    res.json = jest.fn().mockImplementation(() => {
      throw new Error()
    })
    getSession(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(500)
  })
})

describe('getLogout', () => {
  it('should logout', () => {
    const req = getMockReq()
    req.logout = jest.fn()
    const { res } = getMockRes()
    getLogout(req, res)
    expect(req.logout).toHaveBeenCalled()
  })

  it('should return 204 status', () => {
    const req = getMockReq()
    req.logout = jest.fn()
    const { res } = getMockRes()
    getLogout(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(204)
  })
})
