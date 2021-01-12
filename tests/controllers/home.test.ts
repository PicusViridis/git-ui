import { getMockReq, getMockRes } from '@jest-mock/express'
import { getHome } from '../../src/controllers/home'

const { res } = getMockRes()

describe('home', () => {
  beforeEach(jest.resetAllMocks)

  describe('getHome', () => {
    it('should render view with repositories', async () => {
      getHome(getMockReq(), res)
      expect(res.render).toHaveBeenCalledWith('Home')
    })
  })
})
