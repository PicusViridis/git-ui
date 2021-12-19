import { getMockReq, getMockRes } from '@jest-mock/express'
import { getRepository } from 'typeorm'
import { deleteUser, Req } from '../../../../src/controllers/users/deleteUser'
import { mock } from '../../../mocks'

jest.mock('typeorm', () => ({ ...jest.requireActual('typeorm'), getRepository: jest.fn() }))

describe('deleteUser', () => {
  it('should get users', async () => {
    const _delete = jest.fn()
    mock(getRepository).mockReturnValue({ delete: _delete })
    const req = getMockReq<Req>({ params: { username: 'username' } })
    const { res } = getMockRes()
    await deleteUser(req, res)
    expect(_delete).toHaveBeenCalledWith({ username: 'username' })
  })

  it('should return 204 status', async () => {
    mock(getRepository).mockReturnValue({ delete: jest.fn() })
    const req = getMockReq<Req>()
    const { res } = getMockRes()
    await deleteUser(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(204)
  })

  it('should return 500 status when failure', async () => {
    mock(getRepository).mockReturnValue({ delete: jest.fn().mockRejectedValue(new Error()) })
    const req = getMockReq<Req>()
    const { res } = getMockRes()
    await deleteUser(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(500)
  })
})
