import { Axios } from '../../../src/services/Axios'
import { getCommit, getCommits } from '../../../src/services/commit'

jest.mock('../../../src/services/Axios')

describe('getCommits', () => {
  beforeEach(() => {
    jest.mocked(Axios.get).mockResolvedValue({ data: 'commits' })
  })

  it('should get commits', async () => {
    await getCommits('repo', 'branch', 1, 10, 'path')
    expect(Axios.get).toHaveBeenCalledWith('/api/repo/repo/branch/commits', {
      params: { limit: 10, page: 1, path: 'path' },
    })
  })

  it('should return commits', async () => {
    const result = await getCommits('repo', 'branch', 1, 10, 'path')
    expect(result).toBe('commits')
  })
})

describe('getCommit', () => {
  beforeEach(() => {
    jest.mocked(Axios.get).mockResolvedValue({ data: 'commit' })
  })

  it('should get commit', async () => {
    await getCommit('repo', 'branch', 'hash')
    expect(Axios.get).toHaveBeenCalledWith('/api/repo/repo/branch/commits/hash')
  })

  it('should return commit', async () => {
    const result = await getCommit('repo', 'branch', 'hash')
    expect(result).toBe('commit')
  })
})
