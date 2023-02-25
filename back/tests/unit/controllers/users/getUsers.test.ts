import { getMockReq, getMockRes } from '@jest-mock/express'
import { getUsers } from '../../../../src/controllers/users/getUsers'
import { prisma } from '../../../../src/prisma'

describe('getUsers', () => {
  it('should get users', async () => {
    jest.spyOn(prisma.user, 'findMany').mockResolvedValue('users' as never)
    const req = getMockReq()
    const { res } = getMockRes()
    await getUsers(req, res)
    expect(prisma.user.findMany).toHaveBeenCalledWith({ orderBy: { username: 'asc' } })
  })

  it('should return users', async () => {
    jest.spyOn(prisma.user, 'findMany').mockResolvedValue('users' as never)
    const req = getMockReq()
    const { res } = getMockRes()
    await getUsers(req, res)
    expect(res.json).toHaveBeenCalledWith('users')
  })

  it('should return 500 status when failure', async () => {
    jest.spyOn(prisma.user, 'findMany').mockRejectedValue(new Error())
    const req = getMockReq()
    const { res } = getMockRes()
    await getUsers(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(500)
  })
})
