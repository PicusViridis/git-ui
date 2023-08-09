import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { usePage } from '../../../../src/hooks/usePage'
import { useRepoParams } from '../../../../src/hooks/useParams'
import { getBranches } from '../../../../src/services/branch'
import { Breadcrumb } from '../../../../src/views/components/Breadcrumb'
import { mockBranch, mockNavigate, wait } from '../../../mocks'

vi.mock('../../../../src/hooks/useParams')
vi.mock('../../../../src/hooks/usePage')
vi.mock('../../../../src/services/branch')

describe('Breadcrumb', () => {
  beforeEach(() => {
    vi.mocked(useRepoParams).mockReturnValue({ repo: 'repo', branch: 'branch', path: 'path' })
    vi.mocked(usePage).mockReturnValue('tree')
    vi.mocked(getBranches).mockResolvedValue([mockBranch({ name: 'branch1' }), mockBranch({ name: 'branch2' })])
  })

  it('should not render breadcrumb if path is empty', async () => {
    vi.mocked(useRepoParams).mockReturnValue({ repo: 'repo', branch: 'branch' })
    render(<Breadcrumb />)
    await wait()
    expect(screen.queryByText('repo')).not.toBeInTheDocument()
  })

  it('should render breadcrumb', async () => {
    vi.mocked(useRepoParams).mockReturnValue({ repo: 'repo', branch: 'branch', path: 'this/is/a/path' })
    render(<Breadcrumb />)
    await wait()
    expect(screen.getByText('repo')).toHaveAttribute('href', '/repo/repo/branch/tree')
    expect(screen.getByText('this')).toHaveAttribute('href', '/repo/repo/branch/tree?path=this')
    expect(screen.getByText('is')).toHaveAttribute('href', '/repo/repo/branch/tree?path=this/is')
    expect(screen.getByText('a')).toHaveAttribute('href', '/repo/repo/branch/tree?path=this/is/a')
    expect(screen.getByText('path')).not.toHaveAttribute('href')
  })

  it('should render branches', async () => {
    render(<Breadcrumb />)
    await wait()
    expect(screen.getByText('branch1')).toBeInTheDocument()
    expect(screen.getByText('branch2')).toBeInTheDocument()
  })

  it('should selected active branch', async () => {
    render(<Breadcrumb />)
    await wait()
    expect(screen.getByDisplayValue('branch1')).toBeInTheDocument()
  })

  it('should disable branches select if less than 2 branches', async () => {
    vi.mocked(getBranches).mockResolvedValue([mockBranch({ name: 'branch1' })])
    render(<Breadcrumb />)
    await wait()
    expect(screen.getByDisplayValue('branch1')).toBeDisabled()
  })

  it('should change active branch', async () => {
    const navigate = mockNavigate()
    render(<Breadcrumb />)
    await wait()
    fireEvent.change(screen.getByDisplayValue('branch1'), { target: { value: 'branch2' } })
    expect(navigate).toHaveBeenCalledWith('/repo/repo/branch2/tree?path=path')
  })
})
