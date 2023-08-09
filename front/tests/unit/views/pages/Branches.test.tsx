import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useRepoParams } from '../../../../src/hooks/useParams'
import { deleteBranch, getBranches } from '../../../../src/services/branch'
import { Branches } from '../../../../src/views/pages/Branches'
import { mockBranch, wait } from '../../../mocks'

vi.mock('../../../../src/hooks/useParams')
vi.mock('../../../../src/services/branch')

describe('Branches', () => {
  beforeEach(() => {
    vi.mocked(useRepoParams).mockReturnValue({ repo: 'repo', branch: 'branch', path: 'path' })
    vi.mocked(getBranches).mockResolvedValue([mockBranch()])
    vi.mocked(deleteBranch).mockResolvedValue(undefined)
  })

  it('should get branches', async () => {
    render(<Branches />)
    await wait()
    expect(getBranches).toHaveBeenCalledWith('repo')
  })

  it('should render loader when loading', async () => {
    render(<Branches />)
    expect(screen.getByText('Loading branches')).toBeInTheDocument()
    await wait()
  })

  it('should render error on fetch error', async () => {
    vi.mocked(getBranches).mockRejectedValue('Error')
    render(<Branches />)
    await wait()
    expect(screen.getByText('Error while loading branches')).toBeInTheDocument()
  })

  it('should render not found when no branch is found', async () => {
    vi.mocked(getBranches).mockResolvedValue([])
    render(<Branches />)
    await wait()
    expect(screen.getByText('No branch found')).toBeInTheDocument()
  })

  it('should render branch name', async () => {
    render(<Branches />)
    await wait()
    expect(screen.getByText('branch')).toHaveAttribute('href', '/repo/repo/branch/tree?path=path')
  })

  it('should render branch date', async () => {
    render(<Branches />)
    await wait()
    expect(screen.getByText('Updated on Jan 1, 2019')).toBeInTheDocument()
  })

  it('should delete branch when clicking on delete button', async () => {
    render(<Branches />)
    await wait()
    fireEvent.click(screen.getByLabelText('Delete branch "branch"'))
    await wait()
    expect(deleteBranch).toHaveBeenCalledWith('repo', 'branch')
  })

  it('should refresh branches after deleting branch', async () => {
    render(<Branches />)
    await wait()
    vi.mocked(getBranches).mockClear()
    fireEvent.click(screen.getByLabelText('Delete branch "branch"'))
    await wait()
    expect(getBranches).toHaveBeenCalledWith('repo')
  })
})
