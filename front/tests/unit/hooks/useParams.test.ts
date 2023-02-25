import { renderHook } from '@testing-library/react'
import { useLocation, useParams } from 'react-router-dom'
import { useCommitParams, useRepoParams } from '../../../src/hooks/useParams'
import { useTitle } from '../../../src/hooks/useTitle'

jest.mock('../../../src/hooks/useTitle')

describe('useRepoParams', () => {
  beforeEach(() => {
    jest.mocked(useParams).mockReturnValue({ repo: 'repo', branch: 'branch' })
    jest.mocked(useLocation).mockReturnValue({ search: 'path=path' } as never)
  })

  it('should set title', () => {
    renderHook(() => useRepoParams())
    expect(useTitle).toHaveBeenCalledWith('repo')
  })

  it('should throw if repo is missing', () => {
    jest.mocked(useParams).mockReturnValue({ branch: 'branch' })
    expect(() => renderHook(() => useRepoParams())).toThrow('Invalid repo params')
  })

  it('should throw if branch is missing', () => {
    jest.mocked(useParams).mockReturnValue({ repo: 'repo' })
    expect(() => renderHook(() => useRepoParams())).toThrow('Invalid repo params')
  })

  it('should return repo and branch', () => {
    jest.mocked(useLocation).mockReturnValue({} as never)
    const { result } = renderHook(() => useRepoParams())
    expect(result.current).toEqual({ repo: 'repo', branch: 'branch' })
  })

  it('should return repo, branch and path', () => {
    const { result } = renderHook(() => useRepoParams())
    expect(result.current).toEqual({ repo: 'repo', branch: 'branch', path: 'path' })
  })
})

describe('useCommitParams', () => {
  beforeEach(() => {
    jest.mocked(useParams).mockReturnValue({ repo: 'repo', branch: 'branch', hash: 'hash' })
    jest.mocked(useLocation).mockReturnValue({ search: 'path=path' } as never)
  })

  it('should set title', () => {
    renderHook(() => useCommitParams())
    expect(useTitle).toHaveBeenCalledWith('repo')
  })

  it('should throw if repo is missing', () => {
    jest.mocked(useParams).mockReturnValue({ branch: 'branch', hash: 'hash' })
    expect(() => renderHook(() => useCommitParams())).toThrow('Invalid repo params')
  })

  it('should throw if branch is missing', () => {
    jest.mocked(useParams).mockReturnValue({ repo: 'repo', hash: 'hash' })
    expect(() => renderHook(() => useCommitParams())).toThrow('Invalid repo params')
  })

  it('should throw if hash is missing', () => {
    jest.mocked(useParams).mockReturnValue({ repo: 'repo', branch: 'branch' })
    expect(() => renderHook(() => useCommitParams())).toThrow('Invalid commit params')
  })

  it('should return repo, branch, hash and path', () => {
    const { result } = renderHook(() => useCommitParams())
    expect(result.current).toEqual({ repo: 'repo', branch: 'branch', hash: 'hash', path: 'path' })
  })
})
