import { getMockRes } from '@jest-mock/express'
import { getCommit, Req } from '../../../../src/controllers/commits/getCommit'
import { repositoryService } from '../../../../src/libs/repositories'
import { mock, mockReq } from '../../../mocks'

jest.mock('../../../../src/libs/repositories')

describe('getCommit', () => {
  it('should get commit', async () => {
    mock(repositoryService.getCommits).mockResolvedValue([])
    const req = mockReq<Req>()
    const { res } = getMockRes()
    await getCommit(req, res)
    expect(repositoryService.getCommits).toHaveBeenCalledWith('repo', 'path', 'hash', 1, 1)
  })

  it('should return 404 if commit was not found', async () => {
    mock(repositoryService.getCommits).mockResolvedValue([])
    const req = mockReq<Req>()
    const { res } = getMockRes()
    await getCommit(req, res)
    expect(repositoryService.getCommits).toHaveBeenCalledWith('repo', 'path', 'hash', 1, 1)
  })

  it('should get commit diff', async () => {
    mock(repositoryService.getCommits).mockResolvedValue([{ parent: 'parent' }])
    const req = mockReq<Req>()
    const { res } = getMockRes()
    await getCommit(req, res)
    expect(repositoryService.getCommitDiff).toHaveBeenCalledWith('repo', 'path', 'hash', 'parent')
  })

  it('should get commit diff with default path', async () => {
    mock(repositoryService.getCommits).mockResolvedValue([{ parent: 'parent' }])
    const req = mockReq<Req>({ query: { path: undefined } })
    const { res } = getMockRes()
    await getCommit(req, res)
    expect(repositoryService.getCommitDiff).toHaveBeenCalledWith('repo', '.', 'hash', 'parent')
  })

  it('should return commit message and diff', async () => {
    mock(repositoryService.getCommits).mockResolvedValue([{ message: 'message', parent: 'parent' }])
    mock(repositoryService.getCommitDiff).mockResolvedValue('diff')
    const req = mockReq<Req>()
    const { res } = getMockRes()
    await getCommit(req, res)
    expect(res.json).toHaveBeenCalledWith({ message: 'message', diff: 'diff' })
  })

  it('should return 500 status when failure', async () => {
    mock(repositoryService.getCommits).mockRejectedValue(new Error())
    const req = mockReq<Req>()
    const { res } = getMockRes()
    await getCommit(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(500)
  })
})
