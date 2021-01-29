import { getReleases, Req } from '../../../src/controllers/releases/getReleases'
import { Release } from '../../../src/models/Release'
import { getMockReq, getMockRes } from '../../__mocks__/express'
import { mockRepository, RepoMock } from '../../__mocks__/repository'

jest.mock('../../../src/models/Release')

describe('getReleases', () => {
  const req = getMockReq<Req>({ params: { repo: 'repo' } })
  const { res, clearMockRes } = getMockRes()

  let releaseMock: RepoMock<Release>

  beforeEach(() => {
    clearMockRes()

    releaseMock = mockRepository(Release.getRepository as jest.Mock)
    releaseMock.find.mockResolvedValue('releases')
  })

  it('should get releases', async () => {
    await getReleases(req, res)
    expect(releaseMock.find).toHaveBeenCalledWith({
      where: { repo: 'repo' },
      order: { dueDate: 'ASC' },
    })
  })

  it('should render releases page with releases', async () => {
    await getReleases(req, res)
    expect(res.render).toHaveBeenCalledWith('Releases/Releases', { releases: 'releases' })
  })
})
