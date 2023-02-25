import { render, screen } from '@testing-library/react'
import React from 'react'
import { useCommitParams } from '../../../../src/hooks/useParams'
import { getCommit } from '../../../../src/services/commit'
import { Commit } from '../../../../src/ui/pages/Commit'
import { flushPromises, mock, mockCommitDiff, renderAsync } from '../../../mocks'

jest.mock('../../../../src/hooks/useParams')
jest.mock('../../../../src/services/commit')

describe('Commit', () => {
  beforeEach(() => {
    mock(getCommit).mockResolvedValue(mockCommitDiff)
    mock(useCommitParams).mockReturnValue({ repo: 'repo', branch: 'branch', hash: 'hash' })
  })

  it('should get commit', async () => {
    await renderAsync(<Commit />)
    expect(getCommit).toHaveBeenCalledWith('repo', 'branch', 'hash')
  })

  it('should render loader when loading', async () => {
    render(<Commit />)
    expect(screen.getByLabelText('Loading...')).toBeInTheDocument()
    await flushPromises()
  })

  it('should render not found when commit is not found', async () => {
    mock(getCommit).mockResolvedValue(null)
    await renderAsync(<Commit />)
    expect(screen.getByText('Not found')).toBeInTheDocument()
  })

  it('should render commit message', async () => {
    await renderAsync(<Commit />)
    expect(screen.getByText('message')).toBeInTheDocument()
  })

  it('should render diff name', async () => {
    await renderAsync(<Commit />)
    expect(screen.getByText('file.txt')).toBeInTheDocument()
  })

  it('should render diff status', async () => {
    await renderAsync(<Commit />)
    expect(screen.getByText('CHANGED')).toBeInTheDocument()
  })

  it('should render diff lines', async () => {
    await renderAsync(<Commit />)
    expect(screen.getAllByText('1')[0]).toHaveClass('remove')
    expect(screen.getByText('removed line')).toHaveClass('remove')
    expect(screen.getAllByText('1')[1]).toHaveClass('add')
    expect(screen.getByText('added line')).toHaveClass('add')
  })
})
