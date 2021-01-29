import { deleteIssue, Req } from '../../../src/controllers/issues/deleteIssue'
import { Issue } from '../../../src/models/Issue'
import { getMockReq, getMockRes } from '../../__mocks__/express'
import { mockRepository, RepoMock } from '../../__mocks__/repository'

jest.mock('../../../src/models/Issue')

describe('deleteIssue', () => {
  const req = getMockReq<Req>({ params: { repo: 'repo', id: 'id' } })
  const { res, clearMockRes } = getMockRes()

  let issueMock: RepoMock<Issue>

  beforeEach(() => {
    clearMockRes()

    issueMock = mockRepository(Issue.getRepository as jest.Mock)
    issueMock.delete.mockResolvedValue(undefined)
  })

  it('should delete issue', async () => {
    await deleteIssue(req, res)
    expect(issueMock.delete).toHaveBeenCalledWith('id')
  })

  it('should redirect to issues page', async () => {
    await deleteIssue(req, res)
    expect(res.redirect).toHaveBeenCalledWith('/repo/repo/issues/list')
  })
})
