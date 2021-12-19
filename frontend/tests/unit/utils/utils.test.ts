import { makeUrl } from '../../../src/utils/utils'

describe('makeUrl', () => {
  test('should return url without query params if path is not defined', () => {
    expect(makeUrl('repo', 'branch', 'page')).toBe('/repo/repo/branch/page')
  })

  test('should return url with query params if path is defined', () => {
    expect(makeUrl('repo', 'branch', 'page', 'path')).toBe('/repo/repo/branch/page?path=path')
  })
})
