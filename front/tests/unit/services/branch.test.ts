import { Axios } from '../../../src/services/Axios'
import { getBranches } from '../../../src/services/branch'

jest.mock('../../../src/services/Axios')

describe('getBranches', () => {
  beforeEach(() => {
    jest.mocked(Axios.get).mockResolvedValue({ data: 'branches' })
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
