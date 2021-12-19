import { getMockReq, getMockRes } from '@jest-mock/express'
import { getRepository } from 'typeorm'
import { postUser, Req } from '../../../../src/controllers/users/postUser'
import { mock } from '../../../mocks'

jest.mock('typeorm', () => ({ ...jest.requireActual('typeorm'), getRepository: jest.fn() }))

describe('postUser', () => {
  it('should create user', async () => {
    const save = jest.fn()
    mock(getRepository).mockReturnValue({ save })
    const req = getMockReq<Req>({ body: { username: 'username', password: 'password' } })
    const { res } = getMockRes()
    await postUser(req, res)
    expect(save).toHaveBeenCalledWith({
      username: 'username',
      password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    })
  })

  it('should return 201 status', async () => {
    mock(getRepository).mockReturnValue({ save: jest.fn() })
    const req = getMockReq<Req>({ body: { username: 'username', password: 'password' } })
    const { res } = getMockRes()
    await postUser(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(201)
  })

  it('should return 500 status when failure', async () => {
    mock(getRepository).mockReturnValue({ save: jest.fn().mockRejectedValue(new Error()) })
    const req = getMockReq<Req>({ body: { username: 'username', password: 'password' } })
    const { res } = getMockRes()
    await postUser(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(500)
  })
})
