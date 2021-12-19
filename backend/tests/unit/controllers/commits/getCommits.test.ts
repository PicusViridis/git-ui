import { getMockRes } from '@jest-mock/express'
import { getCommits, Req } from '../../../../src/controllers/commits/getCommits'
import { repositoryService } from '../../../../src/libs/repositories'
import { mock, mockReq } from '../../../mocks'

jest.mock('../../../../src/libs/repositories')

describe('getCommits', () => {
  it('should get commits', async () => {
    const req = mockReq<Req>({ query: { page: '1', limit: '10', path: 'path' } })
    const { res } = getMockRes()
    await getCommits(req, res)
    expect(repositoryService.getCommits).toHaveBeenCalledWith('repo', 'path', 'branch', 1, 10)
  })

  it('should get commits with default path', async () => {
    const req = mockReq<Req>({ query: { page: '1', limit: '10' } })
    const { res } = getMockRes()
    await getCommits(req, res)
    expect(repositoryService.getCommits).toHaveBeenCalledWith('repo', '.', 'branch', 1, 10)
  })

  it('should count commits', async () => {
    const req = mockReq<Req>()
    const { res } = getMockRes()
    await getCommits(req, res)
    expect(repositoryService.countCommits).toHaveBeenCalledWith('repo', 'path', 'branch')
  })

  it('should count commits with default path', async () => {
    const req = mockReq<Req>({ query: { path: undefined } })
    const { res } = getMockRes()
    await getCommits(req, res)
    expect(repositoryService.countCommits).toHaveBeenCalledWith('repo', '.', 'branch')
  })

  it('should return commits and total number of commits', async () => {
    mock(repositoryService.getCommits).mockResolvedValue('commits')
    mock(repositoryService.countCommits).mockResolvedValue(10)
    const req = mockReq<Req>()
    const { res } = getMockRes()
    await getCommits(req, res)
    expect(res.json).toHaveBeenCalledWith({ commits: 'commits', total: 10 })
  })

  it('should return 500 status when failure', async () => {
    mock(repositoryService.getCommits).mockRejectedValue(new Error())
    const req = mockReq<Req>()
    const { res } = getMockRes()
    await getCommits(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(500)
  })
})
