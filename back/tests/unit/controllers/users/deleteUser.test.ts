import { getMockReq, getMockRes } from '@jest-mock/express'
import { deleteUser, Req } from '../../../../src/controllers/users/deleteUser'
import { prisma } from '../../../../src/prisma'

describe('deleteUser', () => {
  it('should get users', async () => {
    jest.spyOn(prisma.user, 'delete').mockResolvedValue(undefined as never)
    const req = getMockReq<Req>({ params: { id: '1' } })
    const { res } = getMockRes()
    await deleteUser(req, res)
    expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 1 } })
  })

  it('should return 204 status', async () => {
    jest.spyOn(prisma.user, 'delete').mockResolvedValue(undefined as never)
    const req = getMockReq<Req>()
    const { res } = getMockRes()
    await deleteUser(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(204)
  })

  it('should return 500 status when failure', async () => {
    jest.spyOn(prisma.user, 'delete').mockRejectedValue(new Error())
    const req = getMockReq<Req>()
    const { res } = getMockRes()
    await deleteUser(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(500)
  })
})
