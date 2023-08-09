import { useLocation } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { usePage } from '../../../src/hooks/usePage'

describe('usePage', () => {
  it('should return current page', () => {
    vi.mocked(useLocation).mockReturnValue({ pathname: 'commits' } as never)
    const result = usePage()
    expect(result).toBe('commits')
  })

  it('should throw if current page is invalid', () => {
    vi.mocked(useLocation).mockReturnValue({ pathname: 'toto' } as never)
    expect(() => usePage()).toThrow('Cannot use "usePage" hook in this page')
  })
})
