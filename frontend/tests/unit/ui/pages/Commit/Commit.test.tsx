import { render, screen } from '@testing-library/react'
import React from 'react'
import { Commit } from '../../../../../src/ui/pages/Commit/Commit'
import { IDiffProps } from '../../../../../src/ui/pages/Commit/Diff'
import { useCommit } from '../../../../../src/ui/pages/Commit/useCommit'
import { mock } from '../../../../mocks'

jest.mock('../../../../../src/ui/pages/Commit/useCommit')
jest.mock('../../../../../src/ui/pages/Commit/Diff', () => ({
  Diff: ({ diff }: IDiffProps) => <div>{diff}</div>,
}))

describe('Commit', () => {
  beforeEach(() => {
    mock(useCommit).mockReturnValue({ commit: { message: 'message' }, loading: false, diffs: ['diff1', 'diff2'] })
  })

  it('should show loader when loading', () => {
    mock(useCommit).mockReturnValue({ commit: null, loading: true, diffs: [] })
    render(<Commit />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('should render commit message', () => {
    render(<Commit />)
    expect(screen.getByText('message')).toBeInTheDocument()
  })

  it('should render commit diff', () => {
    render(<Commit />)
    expect(screen.getByText('diff1')).toBeInTheDocument()
    expect(screen.getByText('diff2')).toBeInTheDocument()
  })
})
