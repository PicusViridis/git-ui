import { getMockReq, getMockRes } from '@jest-mock/express'
import { Request } from 'express'
import mockdate from 'mockdate'
import { MoreThan } from 'typeorm'
import { getIssue, Req } from '../../../src/controllers/issues/getIssue'
import { Issue } from '../../../src/models/Issue'
import { Release } from '../../../src/models/Release'
import { mockRepository, RepoMock } from '../../mocks/repository'

mockdate.set('2020-01-01T00:00:00.000Z')

jest.mock('../../../src/models/Release')
jest.mock('../../../src/models/Issue')

describe('getIssue', () => {
  const req = getMockReq<Req>({ params: { repo: 'repo', id: 'id' } })
  const { res, clearMockRes } = getMockRes()

  let releaseMock: RepoMock<Release>
  let issueMock: RepoMock<Issue>

  beforeEach(() => {
    clearMockRes()

    releaseMock = mockRepository(Release.getRepository as jest.Mock)
    releaseMock.find.mockResolvedValue('releases')

    issueMock = mockRepository(Issue.getRepository as jest.Mock)
    issueMock.findOne.mockResolvedValue('issue')
  })

  it('should get releases', async () => {
    await getIssue(req, res)
    expect(releaseMock.find).toHaveBeenCalledWith({
      where: { repo: 'repo', dueDate: MoreThan('2020-01-01T00:00:00.000Z') },
    })
  })

  it('should get issue', async () => {
    await getIssue(req, res)
    expect(issueMock.findOne).toHaveBeenCalledWith('id', { relations: ['release'] })
  })

  it('should render issue page with release and issue', async () => {
    await getIssue(req, res)
    expect(res.render).toHaveBeenCalledWith('Issues/Issue', { releases: 'releases', issue: 'issue' })
  })

  it('should render issue page with releases if id is not present', async () => {
    const req = getMockReq<Request<{ repo: string; id: string }>>({ params: { repo: 'repo' } })
    await getIssue(req, res)
    expect(res.render).toHaveBeenCalledWith('Issues/Issue', { releases: 'releases' })
  })
})
