import { usePagination } from '@saramorillon/hooks'
import { useRepoParams } from '../../../../../src/hooks/useParams'
import { getCommits } from '../../../../../src/services/commit'
import { useCommits } from '../../../../../src/ui/pages/Commits/useCommits'
import { mock, renderHookAsync } from '../../../../mocks'

jest.mock('@saramorillon/hooks', () => ({ ...jest.requireActual('@saramorillon/hooks'), usePagination: jest.fn() }))
jest.mock('diff2html')
jest.mock('../../../../../src/hooks/useParams')
jest.mock('../../../../../src/services/commit')

describe('useCommits', () => {
  beforeEach(() => {
    mock(usePagination).mockReturnValue({ page: 3, setMaxPage: jest.fn() })
    mock(useRepoParams).mockReturnValue({})
    mock(getCommits).mockResolvedValue({ commits: [], total: 0 })
  })

  it('should get pagination', async () => {
    await renderHookAsync(() => useCommits(10))
    expect(usePagination).toHaveBeenCalled()
  })

  it('should get repo params', async () => {
    await renderHookAsync(() => useCommits(10))
    expect(useRepoParams).toHaveBeenCalled()
  })

  it('should get commits', async () => {
    mock(useRepoParams).mockReturnValue({ repo: 'repo', branch: 'branch', path: 'path' })
    await renderHookAsync(() => useCommits(10))
    expect(getCommits).toHaveBeenCalledWith('repo', 'branch', 3, 10, 'path')
  })

  it('should set max page', async () => {
    const setMaxPage = jest.fn()
    mock(usePagination).mockReturnValue({ page: 3, setMaxPage })
    mock(getCommits).mockResolvedValue({ commits: [], total: 50 })
    await renderHookAsync(() => useCommits(10))
    expect(setMaxPage).toHaveBeenCalledWith(5)
  })

  it('should return commits, loading, repo, branch, path and pagination information', async () => {
    mock(useRepoParams).mockReturnValue({ repo: 'repo', branch: 'branch', path: 'path' })
    mock(getCommits).mockResolvedValue({ commits: 'commits', total: 50 })
    const { result } = await renderHookAsync(() => useCommits(10))
    expect(result.current).toEqual({
      commits: 'commits',
      loading: false,
      repo: 'repo',
      branch: 'branch',
      path: 'path',
      page: 3,
    })
  })
})
