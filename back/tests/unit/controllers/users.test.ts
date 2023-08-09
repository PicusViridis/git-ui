import { describe, expect, it, vi } from 'vitest'
import { deleteUser, getUsers, postUser } from '../../../src/controllers/users'
import { prisma } from '../../../src/prisma'
import { getMockReq, getMockRes, mockUser } from '../../mocks'

describe('getUsers', () => {
  it('should get users', async () => {
    vi.spyOn(prisma.user, 'findMany').mockResolvedValue('users' as never)
    const req = getMockReq()
    const { res } = getMockRes()
    await getUsers(req, res)
    expect(prisma.user.findMany).toHaveBeenCalledWith({ orderBy: { username: 'asc' } })
  })

  it('should return users', async () => {
    vi.spyOn(prisma.user, 'findMany').mockResolvedValue('users' as never)
    const req = getMockReq()
    const { res } = getMockRes()
    await getUsers(req, res)
    expect(res.json).toHaveBeenCalledWith('users')
  })

  it('should return 500 status when failure', async () => {
    vi.spyOn(prisma.user, 'findMany').mockRejectedValue(new Error())
    const req = getMockReq()
    const { res } = getMockRes()
    await getUsers(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(500)
  })
})

describe('postUser', () => {
  it('should create user', async () => {
    vi.spyOn(prisma.user, 'create').mockResolvedValue(mockUser())
    const req = getMockReq({ body: { username: 'username', password: 'password' } })
    const { res } = getMockRes()
    await postUser(req, res)
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: { username: 'username', password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8' },
    })
  })

  it('should return 201 status', async () => {
    vi.spyOn(prisma.user, 'create').mockResolvedValue(mockUser())
    const req = getMockReq({ body: { username: 'username', password: 'password' } })
    const { res } = getMockRes()
    await postUser(req, res)
    expect(res.status).toHaveBeenCalledWith(201)
  })

  it('should return 500 status when failure', async () => {
    vi.spyOn(prisma.user, 'create').mockRejectedValue(new Error())
    const req = getMockReq({ body: { username: 'username', password: 'password' } })
    const { res } = getMockRes()
    await postUser(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(500)
  })
})

describe('deleteUser', () => {
  it('should get users', async () => {
    vi.spyOn(prisma.user, 'delete').mockResolvedValue(undefined as never)
    const req = getMockReq({ params: { id: '1' } })
    const { res } = getMockRes()
    await deleteUser(req, res)
    expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 1 } })
  })

  it('should return 204 status', async () => {
    vi.spyOn(prisma.user, 'delete').mockResolvedValue(undefined as never)
    const req = getMockReq({ params: { id: '1' } })
    const { res } = getMockRes()
    await deleteUser(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(204)
  })

  it('should return 500 status when failure', async () => {
    vi.spyOn(prisma.user, 'delete').mockRejectedValue(new Error())
    const req = getMockReq({ params: { id: '1' } })
    const { res } = getMockRes()
    await deleteUser(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(500)
  })
})
