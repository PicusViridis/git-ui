import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Axios } from '../../../src/services/Axios'
import { getRepositories } from '../../../src/services/repository'

vi.mock('../../../src/services/Axios')

describe('getRepositories', () => {
  beforeEach(() => {
    vi.mocked(Axios.get).mockResolvedValue({ data: 'repositories' })
  })

  it('should get repositories', async () => {
    await getRepositories()
    expect(Axios.get).toHaveBeenCalledWith('/api/repositories')
  })

  it('should return repositories', async () => {
    const result = await getRepositories()
    expect(result).toBe('repositories')
  })
})
