import { describe, expect, it, vi } from 'vitest'
import { getCommit, getCommits } from '../../../src/controllers/commits'
import { repositoryService } from '../../../src/libs/repositories'
import { getMockReq, getMockRes } from '../../mocks'

vi.mock('../../../src/libs/repositories')

describe('getCommits', () => {
  it('should get commits', async () => {
    const req = getMockReq({
      params: { repo: 'repo', branch: 'branch' },
      query: { page: '1', limit: '10', path: 'path' },
    })
    const { res } = getMockRes()
    await getCommits(req, res)
    expect(repositoryService.getCommits).toHaveBeenCalledWith('repo', 'path', 'branch', 1, 10)
  })

  it('should get commits with default path', async () => {
    const req = getMockReq({ params: { repo: 'repo', branch: 'branch' }, query: { page: '1', limit: '10' } })
    const { res } = getMockRes()
    await getCommits(req, res)
    expect(repositoryService.getCommits).toHaveBeenCalledWith('repo', '.', 'branch', 1, 10)
  })

  it('should count commits', async () => {
    const req = getMockReq({ params: { repo: 'repo', branch: 'branch' }, query: { path: 'path' } })
    const { res } = getMockRes()
    await getCommits(req, res)
    expect(repositoryService.countCommits).toHaveBeenCalledWith('repo', 'path', 'branch')
  })

  it('should count commits with default path', async () => {
    const req = getMockReq({ params: { repo: 'repo', branch: 'branch' }, query: { path: undefined } })
    const { res } = getMockRes()
    await getCommits(req, res)
    expect(repositoryService.countCommits).toHaveBeenCalledWith('repo', '.', 'branch')
  })

  it('should return commits and total number of commits', async () => {
    vi.mocked(repositoryService.getCommits).mockResolvedValue('commits' as never)
    vi.mocked(repositoryService.countCommits).mockResolvedValue(10)
    const req = getMockReq({ params: { repo: 'repo', branch: 'branch' }, query: { path: 'path' } })
    const { res } = getMockRes()
    await getCommits(req, res)
    expect(res.json).toHaveBeenCalledWith({ commits: 'commits', total: 10 })
  })

  it('should return 500 status when failure', async () => {
    vi.mocked(repositoryService.getCommits).mockRejectedValue(new Error())
    const req = getMockReq({ params: { repo: 'repo', branch: 'branch' }, query: { path: 'path' } })
    const { res } = getMockRes()
    await getCommits(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(500)
  })
})

describe('getCommit', () => {
  it('should get commit', async () => {
    vi.mocked(repositoryService.getCommits).mockResolvedValue([])
    const req = getMockReq({ params: { repo: 'repo', hash: 'hash' }, query: { path: 'path' } })
    const { res } = getMockRes()
    await getCommit(req, res)
    expect(repositoryService.getCommits).toHaveBeenCalledWith('repo', 'path', 'hash', 1, 1)
  })

  it('should return 404 if commit was not found', async () => {
    vi.mocked(repositoryService.getCommits).mockResolvedValue([])
    const req = getMockReq({ params: { repo: 'repo', hash: 'hash' }, query: { path: 'path' } })
    const { res } = getMockRes()
    await getCommit(req, res)
    expect(repositoryService.getCommits).toHaveBeenCalledWith('repo', 'path', 'hash', 1, 1)
  })

  it('should get commit diff', async () => {
    vi.mocked(repositoryService.getCommits).mockResolvedValue([{ parent: 'parent' }] as never)
    const req = getMockReq({ params: { repo: 'repo', hash: 'hash' }, query: { path: 'path' } })
    const { res } = getMockRes()
    await getCommit(req, res)
    expect(repositoryService.getCommitDiff).toHaveBeenCalledWith('repo', 'path', 'hash', 'parent')
  })

  it('should get commit diff with default path', async () => {
    vi.mocked(repositoryService.getCommits).mockResolvedValue([{ parent: 'parent' }] as never)
    const req = getMockReq({ params: { repo: 'repo', hash: 'hash' }, query: { path: undefined } })
    const { res } = getMockRes()
    await getCommit(req, res)
    expect(repositoryService.getCommitDiff).toHaveBeenCalledWith('repo', '.', 'hash', 'parent')
  })

  it('should return commit message and diff', async () => {
    vi.mocked(repositoryService.getCommits).mockResolvedValue([{ message: 'message', parent: 'parent' }] as never)
    vi.mocked(repositoryService.getCommitDiff).mockResolvedValue('diff' as never)
    const req = getMockReq({ params: { repo: 'repo', hash: 'hash' }, query: { path: 'path' } })
    const { res } = getMockRes()
    await getCommit(req, res)
    expect(res.json).toHaveBeenCalledWith({ message: 'message', diff: 'diff' })
  })

  it('should return 500 status when failure', async () => {
    vi.mocked(repositoryService.getCommits).mockRejectedValue(new Error())
    const req = getMockReq({ params: { repo: 'repo', hash: 'hash' }, query: { path: 'path' } })
    const { res } = getMockRes()
    await getCommit(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(500)
  })
})
