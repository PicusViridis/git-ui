import { getMockReq, getMockRes } from '@jest-mock/express'
import { getServerUrl } from '../../../src/controllers/server'

jest.mock('../../../src/config', () => ({ config: { serverUrl: 'serverUrl', logSilent: true } }))

describe('getServerUrl', () => {
  it('should return server URL', () => {
    const req = getMockReq()
    const { res } = getMockRes()
    getServerUrl(req, res)
    expect(res.send).toHaveBeenCalledWith('serverUrl')
  })

  it('should send 500 status when failure', () => {
    const req = getMockReq()
    const { res } = getMockRes()
    res.send = jest.fn().mockImplementation(() => {
      throw new Error()
    })
    getServerUrl(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(500)
  })
})
