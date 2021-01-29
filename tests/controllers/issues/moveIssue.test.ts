import { moveIssue, Req } from '../../../src/controllers/issues/moveIssue'
import { updatePriority } from '../../../src/libs/issuePriority'
import { Issue } from '../../../src/models/Issue'
import { getMockReq, getMockRes } from '../../mocks/express'
import { mockRepository, RepoMock } from '../../mocks/repository'

jest.mock('../../../src/libs/issuePriority')
jest.mock('../../../src/models/Issue')

const updatePriorityMock = updatePriority as jest.Mock

describe('moveIssue', () => {
  const req = getMockReq<Req>({ params: { repo: 'repo', id: '8' }, body: { status: 'doing', priority: 7 } })
  const { res, clearMockRes } = getMockRes()

  let issueMock: RepoMock<Issue>

  beforeEach(() => {
    clearMockRes()

    issueMock = mockRepository(Issue.getRepository as jest.Mock)
    issueMock.update.mockResolvedValue(undefined)
  })

  it('should update priority', async () => {
    await moveIssue(req, res)
    expect(updatePriorityMock).toHaveBeenCalledWith('8', 7)
  })

  it('should update status', async () => {
    await moveIssue(req, res)
    expect(issueMock.update).toHaveBeenCalledWith('8', { status: 'doing' })
  })

  it('should return 204 status', async () => {
    await moveIssue(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(204)
  })
})
