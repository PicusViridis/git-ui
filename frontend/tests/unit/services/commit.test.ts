import { getCommit, getCommits } from '../../../src/services/commit'
import { request } from '../../../src/services/wrapper'
import { mock } from '../../mocks'

jest.mock('../../../src/services/wrapper')

describe('getCommits', () => {
  it('should get commits', async () => {
    mock(request).mockResolvedValue('commits')
    await getCommits('repo', 'branch', 1, 10, 'path')
    expect(request).toHaveBeenCalledWith(
      { url: '/api/repo/repo/branch/commits', params: { limit: 10, page: 1, path: 'path' } },
      { commits: [], total: 0 }
    )
  })

  it('should return commits', async () => {
    mock(request).mockResolvedValue('commits')
    const result = await getCommits('repo', 'branch', 1, 10, 'path')
    expect(result).toBe('commits')
  })
})

describe('getCommit', () => {
  it('should get commit', async () => {
    mock(request).mockResolvedValue('commit')
    await getCommit('repo', 'branch', 'hash')
    expect(request).toHaveBeenCalledWith({ url: '/api/repo/repo/branch/commits/hash' }, null)
  })

  it('should return commit', async () => {
    mock(request).mockResolvedValue('commit')
    const result = await getCommit('repo', 'branch', 'hash')
    expect(result).toBe('commit')
  })
})
