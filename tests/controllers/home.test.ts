import { getMockReq, getMockRes } from '@jest-mock/express'
import { getHome } from '../../src/controllers/home'
import { RepositoryService } from '../../src/libs/repositories'

const { res } = getMockRes()

jest.mock('../../src/libs/repositories')

const mockedListRepositories = RepositoryService.listRepositories as jest.Mock

describe('home', () => {
  describe('getHome', () => {
    it('should render view with repositories', async () => {
      mockedListRepositories.mockResolvedValue('repositories')
      await getHome(getMockReq(), res)
      expect(res.render).toHaveBeenCalledWith('Home', { repositories: 'repositories' })
    })
  })
})
