import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { ICommitProps } from '../../../../../src/ui/pages/Commits/Commit'
import { Commits } from '../../../../../src/ui/pages/Commits/Commits'
import { useCommits } from '../../../../../src/ui/pages/Commits/useCommits'
import { mock, mockCommit1, mockCommit2 } from '../../../../mocks'

jest.mock('../../../../../src/ui/pages/Commits/useCommits')
jest.mock('../../../../../src/ui/pages/Commits/Commit', () => ({
  Commit: ({ commit }: ICommitProps) => <div>{commit.hash}</div>,
}))

function mockUseCommits(mock?: Partial<ReturnType<typeof useCommits>>) {
  return {
    commits: [],
    loading: false,
    repo: 'repo',
    branch: 'branch',
    page: 1,
    maxPage: 1,
    first: jest.fn(),
    previous: jest.fn(),
    next: jest.fn(),
    last: jest.fn(),
    canPrevious: false,
    canNext: false,
    ...mock,
  }
}

describe('Commits', () => {
  beforeEach(() => {
    mock(useCommits).mockReturnValue(mockUseCommits())
  })

  it('should show loader when loading', () => {
    mock(useCommits).mockReturnValue(mockUseCommits({ loading: true }))
    render(<Commits />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('should render commits', () => {
    mock(useCommits).mockReturnValue(mockUseCommits({ commits: [mockCommit1, mockCommit2] }))
    render(<Commits />)
    expect(screen.getByText('hash1')).toBeInTheDocument()
    expect(screen.getByText('hash2')).toBeInTheDocument()
  })

  it('should render current and max page', () => {
    mock(useCommits).mockReturnValue(mockUseCommits({ page: 1, maxPage: 10 }))
    render(<Commits />)
    expect(screen.getByText('Page 1 of 10')).toBeInTheDocument()
  })

  it('should disable first button if cannot go previous', () => {
    render(<Commits />)
    expect(screen.getByTitle('First')).toBeDisabled()
  })

  it('should not disable first button if can go previous', () => {
    mock(useCommits).mockReturnValue(mockUseCommits({ canPrevious: true }))
    render(<Commits />)
    expect(screen.getByTitle('First')).toBeEnabled()
  })

  it('should disable previous button if cannot go previous', () => {
    render(<Commits />)
    expect(screen.getByTitle('Previous')).toBeDisabled()
  })

  it('should not disable previous button if can go previous', () => {
    mock(useCommits).mockReturnValue(mockUseCommits({ canPrevious: true }))
    render(<Commits />)
    expect(screen.getByTitle('Previous')).toBeEnabled()
  })

  it('should disable next button if cannot go next', () => {
    render(<Commits />)
    expect(screen.getByTitle('Next')).toBeDisabled()
  })

  it('should not disable next button if can go next', () => {
    mock(useCommits).mockReturnValue(mockUseCommits({ canNext: true }))
    render(<Commits />)
    expect(screen.getByTitle('Next')).toBeEnabled()
  })

  it('should disable last button if cannot go next', () => {
    render(<Commits />)
    expect(screen.getByTitle('Last')).toBeDisabled()
  })

  it('should not disable last button if can go next', () => {
    mock(useCommits).mockReturnValue(mockUseCommits({ canNext: true }))
    render(<Commits />)
    expect(screen.getByTitle('Last')).toBeEnabled()
  })

  it('should go to first page when clicking on first', () => {
    const first = jest.fn()
    mock(useCommits).mockReturnValue(mockUseCommits({ first, canPrevious: true }))
    render(<Commits />)
    fireEvent.click(screen.getByTitle('First'))
    expect(first).toHaveBeenCalled()
  })

  it('should go to previous page when clicking on previous', () => {
    const previous = jest.fn()
    mock(useCommits).mockReturnValue(mockUseCommits({ previous, canPrevious: true }))
    render(<Commits />)
    fireEvent.click(screen.getByTitle('Previous'))
    expect(previous).toHaveBeenCalled()
  })

  it('should go to next page when clicking on next', () => {
    const next = jest.fn()
    mock(useCommits).mockReturnValue(mockUseCommits({ next, canNext: true }))
    render(<Commits />)
    fireEvent.click(screen.getByTitle('Next'))
    expect(next).toHaveBeenCalled()
  })

  it('should go to last page when clicking on last', () => {
    const last = jest.fn()
    mock(useCommits).mockReturnValue(mockUseCommits({ last, canNext: true }))
    render(<Commits />)
    fireEvent.click(screen.getByTitle('Last'))
    expect(last).toHaveBeenCalled()
  })
})
