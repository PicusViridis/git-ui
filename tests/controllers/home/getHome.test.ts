import { getHome } from '@/controllers/home/getHome'
import { RepositoryService } from '@/libs/repositories'
import { getMockReq, getMockRes } from '@jest-mock/express'

jest.mock('@/libs/repositories')

const listRepositoriesMock = RepositoryService.listRepositories as jest.Mock

describe('getHome', () => {
  const req = getMockReq()
  const { res, clearMockRes } = getMockRes()

  beforeEach(() => {
    clearMockRes()

    listRepositoriesMock.mockResolvedValue('repositories')
  })

  it('should list repositories', async () => {
    await getHome(req, res)
    expect(listRepositoriesMock).toHaveBeenCalled()
  })

  it('should render file page with content and size when type is file', async () => {
    await getHome(req, res)
    expect(res.render).toHaveBeenCalledWith('Home/Home', { repositories: 'repositories', title: 'Repositories' })
  })
})
