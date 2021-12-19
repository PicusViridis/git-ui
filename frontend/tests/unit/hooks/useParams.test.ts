import { renderHook } from '@testing-library/react-hooks'
import { useLocation, useParams } from 'react-router-dom'
import { useCommitParams, useRepoParams } from '../../../src/hooks/useParams'
import { useTitle } from '../../../src/hooks/useTitle'
import { mock } from '../../mocks'

jest.mock('react-router-dom')
jest.mock('../../../src/hooks/useTitle')

describe('useRepoParams', () => {
  beforeEach(() => {
    mock(useParams).mockReturnValue({ repo: 'repo', branch: 'branch' })
    mock(useLocation).mockReturnValue({ search: 'path=path' })
  })

  it('should set title', () => {
    renderHook(() => useRepoParams())
    expect(useTitle).toHaveBeenCalledWith('repo')
  })

  it('should throw if repo is missing', () => {
    mock(useParams).mockReturnValue({ branch: 'branch' })
    const { result } = renderHook(() => useRepoParams())
    expect(result.error?.message).toBe('Invalid repo params')
  })

  it('should throw if branch is missing', () => {
    mock(useParams).mockReturnValue({ repo: 'repo' })
    const { result } = renderHook(() => useRepoParams())
    expect(result.error?.message).toBe('Invalid repo params')
  })

  it('should return repo and branch', () => {
    mock(useLocation).mockReturnValue({})
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
    mock(useParams).mockReturnValue({ repo: 'repo', branch: 'branch', hash: 'hash' })
    mock(useLocation).mockReturnValue({ search: 'path=path' })
  })

  it('should set title', () => {
    renderHook(() => useCommitParams())
    expect(useTitle).toHaveBeenCalledWith('repo')
  })

  it('should throw if repo is missing', () => {
    mock(useParams).mockReturnValue({ branch: 'branch', hash: 'hash' })
    const { result } = renderHook(() => useCommitParams())
    expect(result.error?.message).toBe('Invalid repo params')
  })

  it('should throw if branch is missing', () => {
    mock(useParams).mockReturnValue({ repo: 'repo', hash: 'hash' })
    const { result } = renderHook(() => useCommitParams())
    expect(result.error?.message).toBe('Invalid repo params')
  })

  it('should throw if hash is missing', () => {
    mock(useParams).mockReturnValue({ repo: 'repo', branch: 'branch' })
    const { result } = renderHook(() => useCommitParams())
    expect(result.error?.message).toBe('Invalid commit params')
  })

  it('should return repo, branch, hash and path', () => {
    const { result } = renderHook(() => useCommitParams())
    expect(result.current).toEqual({ repo: 'repo', branch: 'branch', hash: 'hash', path: 'path' })
  })
})
