import { Axios } from '../../../src/services/Axios'
import { getTree } from '../../../src/services/tree'

jest.mock('../../../src/services/Axios')

describe('getTree', () => {
  beforeEach(() => {
    jest.mocked(Axios.get).mockResolvedValue({ data: 'tree' })
  })

  it('should get tree', async () => {
    await getTree('repo', 'branch', 'path')
    expect(Axios.get).toHaveBeenCalledWith('/api/repo/repo/branch/tree', { params: { path: 'path' } })
  })

  it('should return tree', async () => {
    const result = await getTree('repo', 'branch', 'path')
    expect(result).toBe('tree')
  })
})
