import { getLogin } from '../../../src/controllers/session/getLogin'
import { getMockReq, getMockRes } from '../../__mocks__/express'

describe('getLogin', () => {
  it('should render login page with error', () => {
    const req = getMockReq()
    req.flash = jest.fn().mockReturnValue(['error'])
    const { res } = getMockRes()
    getLogin(req, res)
    expect(res.render).toHaveBeenCalledWith('Login/Login', { error: 'error', title: 'Login' })
  })
})
