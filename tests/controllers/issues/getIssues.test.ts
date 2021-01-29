import { getIssues, Req } from '../../../src/controllers/issues/getIssues'
import { Issue } from '../../../src/models/Issue'
import { getMockReq, getMockRes } from '../../__mocks__/express'
import { mockRepository, RepoMock } from '../../__mocks__/repository'

jest.mock('../../../src/models/Release')
jest.mock('../../../src/models/Issue')

describe('getIssues', () => {
  const req = getMockReq<Req>({ params: { repo: 'repo' } })
  const { res, clearMockRes } = getMockRes()

  let issueMock: RepoMock<Issue>

  beforeEach(() => {
    clearMockRes()

    issueMock = mockRepository(Issue.getRepository as jest.Mock)
    issueMock.find.mockResolvedValue('issues')
  })

  it('should get issues', async () => {
    await getIssues(req, res)
    expect(issueMock.find).toHaveBeenCalledWith({
      where: { repo: 'repo' },
      order: { updatedAt: 'DESC' },
      relations: ['release', 'author'],
    })
  })

  it('should render issues page with issues', async () => {
    await getIssues(req, res)
    expect(res.render).toHaveBeenCalledWith('Issues/Issues', { issues: 'issues' })
  })
})
