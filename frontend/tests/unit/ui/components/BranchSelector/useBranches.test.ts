import { act } from 'react-dom/test-utils'
import { useNavigate } from 'react-router-dom'
import { getBranches } from '../../../../../src/services/branch'
import { useBranches } from '../../../../../src/ui/components/BranchSelector/useBranches'
import { mock, renderHookAsync } from '../../../../mocks'

jest.mock('react-router-dom')
jest.mock('../../../../../src/services/branch')

describe('useBranches', () => {
  beforeEach(() => {
    mock(getBranches).mockResolvedValue([])
  })

  it('should get branches', async () => {
    await renderHookAsync(() => useBranches('repo', 'commits', 'path'))
    expect(getBranches).toHaveBeenCalledWith('repo')
  })

  it('should return loading, branches, and change function', async () => {
    const { result } = await renderHookAsync(() => useBranches('repo', 'commits', 'path'))
    expect(result.current).toEqual({
      loading: false,
      branches: [],
      onChange: expect.any(Function),
    })
  })

  it('should navigate to branch page when changing branch', async () => {
    const navigate = jest.fn()
    mock(useNavigate).mockReturnValue(navigate)
    const { result } = await renderHookAsync(() => useBranches('repo', 'commits', 'path'))
    act(() => result.current.onChange('branch1'))
    expect(navigate).toHaveBeenCalledWith('/repo/repo/branch1/commits?path=path')
  })
})
