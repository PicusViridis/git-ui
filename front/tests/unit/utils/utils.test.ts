import { describe, expect, it } from 'vitest'
import { makeUrl } from '../../../src/utils/utils'

describe('makeUrl', () => {
  it('should return url without query params if path is not defined', () => {
    expect(makeUrl('repo', 'branch', 'page')).toBe('/repo/repo/branch/page')
  })

  it('should return url with query params if path is defined', () => {
    expect(makeUrl('repo', 'branch', 'page', 'path')).toBe('/repo/repo/branch/page?path=path')
  })
})
