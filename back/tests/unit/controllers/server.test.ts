import { describe, expect, it, vi } from 'vitest'
import { getServerUrl } from '../../../src/controllers/server'
import { getMockReq, getMockRes } from '../../mocks'

describe('getServerUrl', () => {
  it('should return server URL', () => {
    const req = getMockReq()
    const { res } = getMockRes()
    getServerUrl(req, res)
    expect(res.send).toHaveBeenCalledWith('server_url')
  })

  it('should send 500 status when failure', () => {
    const req = getMockReq()
    const { res } = getMockRes()
    res.send = vi.fn().mockImplementation(() => {
      throw new Error()
    })
    getServerUrl(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(500)
  })
})
