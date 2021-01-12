import { getMockReq, getMockRes } from '@jest-mock/express'
import { getAddUser, getDeleteUser, getListUsers, postAddUser } from '../../src/controllers/admin'
import { User } from '../../src/models/User'

const { res } = getMockRes()

jest.mock('../../src/models/User')

const mockedRepository = User.getRepository as jest.Mock

describe('admin', () => {
  beforeEach(jest.resetAllMocks)

  describe('getListUsers', () => {
    it('should send users to render', async () => {
      const find = jest.fn().mockResolvedValue([{ username: 'toto' }])
      mockedRepository.mockReturnValue({ find })
      await getListUsers(getMockReq(), res)
      expect(res.render).toHaveBeenCalledWith('admin/ListUsers', { users: [{ username: 'toto' }] })
    })
  })

  describe('getAddUser', () => {
    it('should render view', async () => {
      await getAddUser(getMockReq(), res)
      expect(res.render).toHaveBeenCalledWith('admin/AddUser')
    })
  })

  describe('postAddUser', () => {
    it('should create user and redirect', async () => {
      const save = jest.fn()
      mockedRepository.mockReturnValue({ save })
      const req = getMockReq({ body: { username: 'toto', password: 'tutu' } })
      await postAddUser(req, res)
      expect(save).toHaveBeenCalledWith({
        username: 'toto',
        password: 'eb0295d98f37ae9e95102afae792d540137be2dedf6c4b00570ab1d1f355d033',
      })
      expect(res.redirect).toHaveBeenCalledWith('/admin')
    })
  })

  describe('getDeleteUser', () => {
    it('should delete user and redirect', async () => {
      const _delete = jest.fn()
      mockedRepository.mockReturnValue({ delete: _delete })
      const req = getMockReq({ params: { username: 'toto' } })
      await getDeleteUser(req, res)
      expect(_delete).toHaveBeenCalledWith('toto')
      expect(res.redirect).toHaveBeenCalledWith('/admin')
    })
  })
})
