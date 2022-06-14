import { render, screen } from '@testing-library/react'
import React from 'react'
import { useCommitParams } from '../../../../../src/hooks/useParams'
import { getCommit } from '../../../../../src/services/commit'
import { Commit } from '../../../../../src/ui/pages/Commit/Commit'
import { flushPromises, mock, mockCommitDiff, renderAsync } from '../../../../mocks'

jest.mock('../../../../../src/hooks/useParams')
jest.mock('../../../../../src/services/commit')

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

  it('should render commit diff', async () => {
    await renderAsync(<Commit />)
    expect(screen.getByText('removed line')).toBeInTheDocument()
    expect(screen.getByText('added line')).toBeInTheDocument()
  })
})
