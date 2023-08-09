import { render, screen } from '@testing-library/react'
import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useCommitParams } from '../../../../src/hooks/useParams'
import { getCommit } from '../../../../src/services/commit'
import { Commit } from '../../../../src/views/pages/Commit'
import { mockCommitDiff, wait } from '../../../mocks'

vi.mock('../../../../src/hooks/useParams')
vi.mock('../../../../src/services/commit')

describe('Commit', () => {
  beforeEach(() => {
    vi.mocked(getCommit).mockResolvedValue(mockCommitDiff())
    vi.mocked(useCommitParams).mockReturnValue({ repo: 'repo', branch: 'branch', hash: 'hash' })
  })

  it('should get commit', async () => {
    render(<Commit />)
    await wait()
    expect(getCommit).toHaveBeenCalledWith('repo', 'branch', 'hash')
  })

  it('should render loader when loading', async () => {
    render(<Commit />)
    expect(screen.getByText('Loading commit')).toBeInTheDocument()
    await wait()
  })

  it('should render error on fetch error', async () => {
    vi.mocked(getCommit).mockRejectedValue('Error')
    render(<Commit />)
    await wait()
    expect(screen.getByText('Error while loading commit')).toBeInTheDocument()
  })

  it('should render not found when commit is not found', async () => {
    vi.mocked(getCommit).mockResolvedValue(null)
    render(<Commit />)
    await wait()
    expect(screen.getByText('Commit not found')).toBeInTheDocument()
  })

  it('should render commit message', async () => {
    render(<Commit />)
    await wait()
    expect(screen.getByText('message')).toBeInTheDocument()
  })

  it('should render diff name', async () => {
    render(<Commit />)
    await wait()
    expect(screen.getByText('file.txt')).toBeInTheDocument()
  })

  it('should render diff status', async () => {
    render(<Commit />)
    await wait()
    expect(screen.getByText('CHANGED')).toBeInTheDocument()
  })

  it('should render diff lines', async () => {
    render(<Commit />)
    await wait()
    expect(screen.getAllByText('1')[0]).toHaveClass('remove')
    expect(screen.getByText('removed line')).toHaveClass('remove')
    expect(screen.getAllByText('1')[1]).toHaveClass('add')
    expect(screen.getByText('added line')).toHaveClass('add')
  })
})
