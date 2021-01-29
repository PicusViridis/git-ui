import { deleteRelease, Req } from '../../../src/controllers/releases/deleteRelease'
import { Release } from '../../../src/models/Release'
import { getMockReq, getMockRes } from '../../__mocks__/express'
import { mockRepository, RepoMock } from '../../__mocks__/repository'

jest.mock('../../../src/models/Release')

describe('deleteRelease', () => {
  const req = getMockReq<Req>({ params: { repo: 'repo', id: 'id' } })
  const { res, clearMockRes } = getMockRes()

  let releaseMock: RepoMock<Release>

  beforeEach(() => {
    clearMockRes()

    releaseMock = mockRepository(Release.getRepository as jest.Mock)
    releaseMock.delete.mockResolvedValue(undefined)
  })

  it('should delete release', async () => {
    await deleteRelease(req, res)
    expect(releaseMock.delete).toHaveBeenCalledWith('id')
  })

  it('should redirect to releases page', async () => {
    await deleteRelease(req, res)
    expect(res.redirect).toHaveBeenCalledWith('/repo/repo/releases/list')
  })
})
