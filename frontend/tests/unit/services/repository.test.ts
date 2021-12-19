import { getRepositories } from '../../../src/services/repository'
import { request } from '../../../src/services/wrapper'
import { mock } from '../../mocks'

jest.mock('../../../src/services/wrapper')

describe('getRepositories', () => {
  it('should get repositories', async () => {
    mock(request).mockResolvedValue('repositories')
    await getRepositories()
    expect(request).toHaveBeenCalledWith({ url: '/api/repositories' }, [])
  })

  it('should return repositories', async () => {
    mock(request).mockResolvedValue('repositories')
    const result = await getRepositories()
    expect(result).toBe('repositories')
  })
})
