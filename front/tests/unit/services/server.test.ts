import { Axios } from '../../../src/services/Axios'
import { getServerUrl } from '../../../src/services/server'

jest.mock('../../../src/services/Axios')

describe('getServerUrl', () => {
  beforeEach(() => {
    jest.mocked(Axios.get).mockResolvedValue({ data: 'server url' })
  })

  it('should get server url', async () => {
    await getServerUrl()
    expect(Axios.get).toHaveBeenCalledWith('/api/serverurl')
  })

  it('should return server url', async () => {
    const result = await getServerUrl()
    expect(result).toBe('server url')
  })
})
