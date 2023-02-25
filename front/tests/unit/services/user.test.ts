import { deleteUser, getUsers, postUser } from '../../../src/services/user'
import { request } from '../../../src/services/wrapper'
import { mock, mockUser1 } from '../../mocks'

jest.mock('../../../src/services/wrapper')

describe('getUsers', () => {
  it('should get user', async () => {
    mock(request).mockResolvedValue('user')
    await getUsers()
    expect(request).toHaveBeenCalledWith({ url: '/api/users' }, [])
  })

  it('should return user', async () => {
    mock(request).mockResolvedValue('user')
    const result = await getUsers()
    expect(result).toBe('user')
  })
})

describe('postUser', () => {
  it('should post user', async () => {
    await postUser('username', 'password')
    expect(request).toHaveBeenCalledWith(
      { url: '/api/users', method: 'POST', data: { password: 'password', username: 'username' } },
      undefined
    )
  })
})

describe('deleteUser', () => {
  it('should delete user', async () => {
    await deleteUser(mockUser1)
    expect(request).toHaveBeenCalledWith({ url: '/api/users/1', method: 'DELETE' }, undefined)
  })
})
