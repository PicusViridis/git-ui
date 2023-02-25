import { getBranches } from '../../../src/services/branch'
import { request } from '../../../src/services/wrapper'
import { mock } from '../../mocks'

jest.mock('../../../src/services/wrapper')

describe('getBranches', () => {
  it('should get branches', async () => {
    mock(request).mockResolvedValue('branches')
    await getBranches('repo')
    expect(request).toHaveBeenCalledWith({ url: '/api/repo/repo/branches' }, [])
  })

  it('should return branches', async () => {
    mock(request).mockResolvedValue('branches')
    const result = await getBranches('repo')
    expect(result).toBe('branches')
  })
})
