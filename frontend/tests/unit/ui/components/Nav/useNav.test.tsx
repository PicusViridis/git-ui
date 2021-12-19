import { renderHook } from '@testing-library/react-hooks'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRepoParams } from '../../../../../src/hooks/useParams'
import { useNav } from '../../../../../src/ui/components/Nav/useNav'
import { toBreadcrumb } from '../../../../../src/utils/breadcrumbs'
import { mock } from '../../../../mocks'

jest.mock('react-router-dom')
jest.mock('../../../../../src/hooks/useParams')
jest.mock('../../../../../src/utils/breadcrumbs')

describe('useNav', () => {
  beforeEach(() => {
    mock(useLocation).mockReturnValue({ pathname: 'pathname' })
    mock(useRepoParams).mockReturnValue({})
    mock(toBreadcrumb).mockReturnValue([])
  })

  it('should return repo, branch, path, breadcrumb and tab modifier', () => {
    mock(useRepoParams).mockReturnValue({ repo: 'repo', branch: 'branch', path: 'path' })
    const { result } = renderHook(() => useNav('tree'))
    expect(result.current).toEqual({
      repo: 'repo',
      branch: 'branch',
      path: 'path',
      breadcrumb: [],
      onTabChange: expect.any(Function),
    })
  })

  it('should navigate to page when changing tab', () => {
    const navigate = jest.fn()
    mock(useNavigate).mockReturnValue(navigate)
    mock(useRepoParams).mockReturnValue({ repo: 'repo', branch: 'branch', path: 'path' })
    const { result } = renderHook(() => useNav('tree'))
    result.current.onTabChange('commits')
    expect(navigate).toHaveBeenCalledWith('/repo/repo/branch/commits?path=path')
  })
})
