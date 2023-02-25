import { getMockRes } from '@jest-mock/express'
import { getCommit, getCommits, Req1, Req2 } from '../../../src/controllers/commits'
import { repositoryService } from '../../../src/libs/repositories'
import { mock, mockReq } from '../../mocks'

jest.mock('../../../src/libs/repositories')

describe('getCommits', () => {
  it('should get commits', async () => {
    const req = mockReq<Req1>({ query: { page: '1', limit: '10', path: 'path' } })
    const { res } = getMockRes()
    await getCommits(req, res)
    expect(repositoryService.getCommits).toHaveBeenCalledWith('repo', 'path', 'branch', 1, 10)
  })

  it('should get commits with default path', async () => {
    const req = mockReq<Req1>({ query: { page: '1', limit: '10' } })
    const { res } = getMockRes()
    await getCommits(req, res)
    expect(repositoryService.getCommits).toHaveBeenCalledWith('repo', '.', 'branch', 1, 10)
  })

  it('should count commits', async () => {
    const req = mockReq<Req1>()
    const { res } = getMockRes()
    await getCommits(req, res)
    expect(repositoryService.countCommits).toHaveBeenCalledWith('repo', 'path', 'branch')
  })

  it('should count commits with default path', async () => {
    const req = mockReq<Req1>({ query: { path: undefined } })
    const { res } = getMockRes()
    await getCommits(req, res)
    expect(repositoryService.countCommits).toHaveBeenCalledWith('repo', '.', 'branch')
  })

  it('should return commits and total number of commits', async () => {
    mock(repositoryService.getCommits).mockResolvedValue('commits')
    mock(repositoryService.countCommits).mockResolvedValue(10)
    const req = mockReq<Req1>()
    const { res } = getMockRes()
    await getCommits(req, res)
    expect(res.json).toHaveBeenCalledWith({ commits: 'commits', total: 10 })
  })

  it('should return 500 status when failure', async () => {
    mock(repositoryService.getCommits).mockRejectedValue(new Error())
    const req = mockReq<Req1>()
    const { res } = getMockRes()
    await getCommits(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(500)
  })
})

describe('getCommit', () => {
  it('should get commit', async () => {
    mock(repositoryService.getCommits).mockResolvedValue([])
    const req = mockReq<Req2>()
    const { res } = getMockRes()
    await getCommit(req, res)
    expect(repositoryService.getCommits).toHaveBeenCalledWith('repo', 'path', 'hash', 1, 1)
  })

  it('should return 404 if commit was not found', async () => {
    mock(repositoryService.getCommits).mockResolvedValue([])
    const req = mockReq<Req2>()
    const { res } = getMockRes()
    await getCommit(req, res)
    expect(repositoryService.getCommits).toHaveBeenCalledWith('repo', 'path', 'hash', 1, 1)
  })

  it('should get commit diff', async () => {
    mock(repositoryService.getCommits).mockResolvedValue([{ parent: 'parent' }])
    const req = mockReq<Req2>()
    const { res } = getMockRes()
    await getCommit(req, res)
    expect(repositoryService.getCommitDiff).toHaveBeenCalledWith('repo', 'path', 'hash', 'parent')
  })

  it('should get commit diff with default path', async () => {
    mock(repositoryService.getCommits).mockResolvedValue([{ parent: 'parent' }])
    const req = mockReq<Req2>({ query: { path: undefined } })
    const { res } = getMockRes()
    await getCommit(req, res)
    expect(repositoryService.getCommitDiff).toHaveBeenCalledWith('repo', '.', 'hash', 'parent')
  })

  it('should return commit message and diff', async () => {
    mock(repositoryService.getCommits).mockResolvedValue([{ message: 'message', parent: 'parent' }])
    mock(repositoryService.getCommitDiff).mockResolvedValue('diff')
    const req = mockReq<Req2>()
    const { res } = getMockRes()
    await getCommit(req, res)
    expect(res.json).toHaveBeenCalledWith({ message: 'message', diff: 'diff' })
  })

  it('should return 500 status when failure', async () => {
    mock(repositoryService.getCommits).mockRejectedValue(new Error())
    const req = mockReq<Req2>()
    const { res } = getMockRes()
    await getCommit(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(500)
  })
})
