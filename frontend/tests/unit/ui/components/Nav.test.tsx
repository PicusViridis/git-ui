import { fireEvent, screen } from '@testing-library/react'
import React from 'react'
import { useRepoParams } from '../../../../src/hooks/useParams'
import { getBranches } from '../../../../src/services/branch'
import { Nav } from '../../../../src/ui/components/Nav'
import { mock, mockNavigate, renderAsync, routerWrapper } from '../../../mocks'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))
jest.mock('../../../../src/hooks/useParams')
jest.mock('../../../../src/services/branch')

describe('Nav', () => {
  beforeEach(() => {
    mock(useRepoParams).mockReturnValue({ repo: 'repo', branch: 'branch', path: 'path' })
    mock(getBranches).mockResolvedValue(['branch1', 'branch2'])
  })

  it('should render tabs', async () => {
    await renderAsync(<Nav page="tree" />, { wrapper: routerWrapper })
    expect(screen.getByText('Files')).toHaveAttribute('href', '/repo/repo/branch/tree?path=path')
    expect(screen.getByText('Commits')).toHaveAttribute('href', '/repo/repo/branch/commits?path=path')
  })

  it('should render active tab', async () => {
    await renderAsync(<Nav page="tree" />, { wrapper: routerWrapper })
    expect(screen.getByText('Files')).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Commits')).toHaveAttribute('aria-selected', 'false')
  })

  it('should not render breadcrumb if path is empty', async () => {
    mock(useRepoParams).mockReturnValue({ repo: 'repo', branch: 'branch' })
    await renderAsync(<Nav page="tree" />, { wrapper: routerWrapper })
    expect(screen.queryByText('repo')).not.toBeInTheDocument()
  })

  it('should render breadcrumb', async () => {
    mock(useRepoParams).mockReturnValue({ repo: 'repo', branch: 'branch', path: 'this/is/a/path' })
    await renderAsync(<Nav page="tree" />, { wrapper: routerWrapper })
    expect(screen.getByText('repo')).toHaveAttribute('href', '/repo/repo/branch/tree')
    expect(screen.getByText('this')).toHaveAttribute('href', '/repo/repo/branch/tree?path=this')
    expect(screen.getByText('is')).toHaveAttribute('href', '/repo/repo/branch/tree?path=this/is')
    expect(screen.getByText('a')).toHaveAttribute('href', '/repo/repo/branch/tree?path=this/is/a')
    expect(screen.getByText('path')).not.toHaveAttribute('href')
  })

  it('should render branches', async () => {
    mock(getBranches).mockResolvedValue(['branch1', 'branch2'])
    await renderAsync(<Nav page="tree" />, { wrapper: routerWrapper })
    expect(screen.getByText('branch1')).toBeInTheDocument()
    expect(screen.getByText('branch2')).toBeInTheDocument()
  })

  it('should selected active branch', async () => {
    await renderAsync(<Nav page="tree" />, { wrapper: routerWrapper })
    expect(screen.getByDisplayValue('branch1')).toBeInTheDocument()
  })

  it('should disable branches select if less than 2 branches', async () => {
    mock(getBranches).mockResolvedValue(['branch1'])
    await renderAsync(<Nav page="tree" />, { wrapper: routerWrapper })
    expect(screen.getByDisplayValue('branch1')).toBeDisabled()
  })

  it('should change active branch', async () => {
    const navigate = mockNavigate()
    mock(getBranches).mockResolvedValue(['branch1', 'branch2'])
    await renderAsync(<Nav page="tree" />, { wrapper: routerWrapper })
    fireEvent.change(screen.getByDisplayValue('branch1'), { target: { value: 'branch2' } })
    expect(navigate).toHaveBeenCalledWith('/repo/repo/branch2/tree?path=path')
  })
})
