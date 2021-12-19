import { getServerUrl } from '../../../src/services/server'
import { request } from '../../../src/services/wrapper'
import { mock } from '../../mocks'

jest.mock('../../../src/services/wrapper')

describe('getServerUrl', () => {
  it('should get server url', async () => {
    mock(request).mockResolvedValue('server url')
    await getServerUrl()
    expect(request).toHaveBeenCalledWith({ url: '/api/serverurl' }, '')
  })

  it('should return server url', async () => {
    mock(request).mockResolvedValue('server url')
    const result = await getServerUrl()
    expect(result).toBe('server url')
  })
})
