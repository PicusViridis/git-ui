import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Axios } from '../../../src/services/Axios'
import { deleteBranch, getBranches } from '../../../src/services/branch'

vi.mock('../../../src/services/Axios')

describe('getBranches', () => {
  beforeEach(() => {
    vi.mocked(Axios.get).mockResolvedValue({ data: 'branches' })
  })

  it('should get branches', async () => {
    await getBranches('repo')
    expect(Axios.get).toHaveBeenCalledWith('/api/repo/repo/branches')
  })

  it('should return branches', async () => {
    const result = await getBranches('repo')
    expect(result).toBe('branches')
  })
})

describe('deleteBranch', () => {
  beforeEach(() => {
    vi.mocked(Axios.delete).mockResolvedValue(undefined)
  })

  it('should get branches', async () => {
    await deleteBranch('repo', 'branch')
    expect(Axios.delete).toHaveBeenCalledWith('/api/repo/repo/branches/branch')
  })
})
