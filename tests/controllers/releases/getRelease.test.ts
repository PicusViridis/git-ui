import { getRelease, Req } from '../../../src/controllers/releases/getRelease'
import { Release } from '../../../src/models/Release'
import { getMockReq, getMockRes } from '../../__mocks__/express'
import { mockRepository, RepoMock } from '../../__mocks__/repository'

jest.mock('../../../src/models/Release')
jest.mock('../../../src/models/Release')

describe('getRelease', () => {
  const req = getMockReq<Req>({ params: { repo: 'repo', id: 'id' } })
  const { res, clearMockRes } = getMockRes()

  let releaseMock: RepoMock<Release>

  beforeEach(() => {
    clearMockRes()

    releaseMock = mockRepository(Release.getRepository as jest.Mock)
    releaseMock.findOne.mockResolvedValue('release')
  })

  it('should get release', async () => {
    await getRelease(req, res)
    expect(releaseMock.findOne).toHaveBeenCalledWith('id', { relations: ['issues'] })
  })

  it('should render release page with release and release', async () => {
    await getRelease(req, res)
    expect(res.render).toHaveBeenCalledWith('Releases/Release', { release: 'release' })
  })

  it('should render release page with releases if id is not present', async () => {
    const req = getMockReq<Req>({ params: { repo: 'repo' } })
    await getRelease(req, res)
    expect(res.render).toHaveBeenCalledWith('Releases/Release')
  })
})
