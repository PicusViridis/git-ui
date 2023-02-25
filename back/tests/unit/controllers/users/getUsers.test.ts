import { getMockReq, getMockRes } from '@jest-mock/express'
import { getRepository } from 'typeorm'
import { getUsers } from '../../../../src/controllers/users/getUsers'
import { mock } from '../../../mocks'

jest.mock('typeorm', () => ({ ...jest.requireActual('typeorm'), getRepository: jest.fn() }))

describe('getUsers', () => {
  it('should get users', async () => {
    const find = jest.fn()
    mock(getRepository).mockReturnValue({ find })
    const req = getMockReq()
    const { res } = getMockRes()
    await getUsers(req, res)
    expect(find).toHaveBeenCalledWith({ order: { username: 'ASC' } })
  })

  it('should return users', async () => {
    mock(getRepository).mockReturnValue({ find: jest.fn().mockResolvedValue('users') })
    const req = getMockReq()
    const { res } = getMockRes()
    await getUsers(req, res)
    expect(res.json).toHaveBeenCalledWith('users')
  })

  it('should return 500 status when failure', async () => {
    mock(getRepository).mockReturnValue({ find: jest.fn().mockRejectedValue(new Error()) })
    const req = getMockReq()
    const { res } = getMockRes()
    await getUsers(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(500)
  })
})
