import { useLocation } from 'react-router-dom'
import { usePage } from '../../../src/hooks/usePage'

describe('usePage', () => {
  it('should return current page', () => {
    jest.mocked(useLocation).mockReturnValue({ pathname: 'commits' } as never)
    const result = usePage()
    expect(result).toBe('commits')
  })

  it('should throw if current page is invalid', () => {
    jest.mocked(useLocation).mockReturnValue({ pathname: 'toto' } as never)
    expect(() => usePage()).toThrow('Cannot use "usePage" hook in this page')
  })
})
