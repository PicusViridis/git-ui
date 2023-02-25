import { getTree } from '../../../src/services/tree'
import { request } from '../../../src/services/wrapper'
import { mock } from '../../mocks'

jest.mock('../../../src/services/wrapper')

describe('getTree', () => {
  it('should get tree', async () => {
    mock(request).mockResolvedValue('tree')
    await getTree('repo', 'branch', 'path')
    expect(request).toHaveBeenCalledWith({ url: '/api/repo/repo/branch/tree', params: { path: 'path' } }, [])
  })

  it('should return tree', async () => {
    mock(request).mockResolvedValue('tree')
    const result = await getTree('repo', 'branch', 'path')
    expect(result).toBe('tree')
  })
})
