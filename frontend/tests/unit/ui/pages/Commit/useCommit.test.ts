import { parse } from 'diff2html'
import { useCommitParams } from '../../../../../src/hooks/useParams'
import { getCommit } from '../../../../../src/services/commit'
import { useCommit } from '../../../../../src/ui/pages/Commit/useCommit'
import { mock, renderHookAsync } from '../../../../mocks'

jest.mock('diff2html')
jest.mock('../../../../../src/hooks/useParams')
jest.mock('../../../../../src/services/commit')

describe('useCommit', () => {
  beforeEach(() => {
    mock(useCommitParams).mockReturnValue({})
    mock(getCommit).mockResolvedValue(null)
  })

  it('should get commit params', async () => {
    await renderHookAsync(() => useCommit())
    expect(useCommitParams).toHaveBeenCalled()
  })

  it('should get commit', async () => {
    mock(useCommitParams).mockReturnValue({ repo: 'repo', branch: 'branch', hash: 'hash' })
    await renderHookAsync(() => useCommit())
    expect(getCommit).toHaveBeenCalledWith('repo', 'branch', 'hash')
  })

  it('should not parse commit diff is commit is null', async () => {
    await renderHookAsync(() => useCommit())
    expect(parse).not.toHaveBeenCalled()
  })

  it('should parse commit diff', async () => {
    mock(getCommit).mockResolvedValue({ diff: '' })
    await renderHookAsync(() => useCommit())
    expect(parse).toHaveBeenCalledWith('')
  })

  it('should return commit, loading and diff', async () => {
    mock(getCommit).mockResolvedValue('commit')
    mock(parse).mockReturnValue('diffs')
    const { result } = await renderHookAsync(() => useCommit())
    expect(result.current).toEqual({ commit: 'commit', loading: false, diffs: 'diffs' })
  })
})
