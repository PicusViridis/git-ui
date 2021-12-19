import { fireEvent, render, screen } from '@testing-library/react'
import mockdate from 'mockdate'
import React from 'react'
import { useCopy } from '../../../../../src/hooks/useCopy'
import { Commit } from '../../../../../src/ui/pages/Commits/Commit'
import { mock, mockCommit1, routerWrapper } from '../../../../mocks'

jest.mock('../../../../../src/hooks/useCopy')

mockdate.set('2019-02-01T00:00:00.000Z')

describe('Commit', () => {
  beforeEach(() => {
    mock(useCopy).mockReturnValue([false, { loading: false }, jest.fn()])
  })

  it('should render commit message', () => {
    render(<Commit commit={mockCommit1} repo="repo" branch="branch" path="path" />, { wrapper: routerWrapper })
    expect(screen.getByText('message1')).toBeInTheDocument()
  })

  it('should render commit message link', () => {
    render(<Commit commit={mockCommit1} repo="repo" branch="branch" path="path" />, { wrapper: routerWrapper })
    expect(screen.getByText('message1')).toHaveAttribute('href', '/repo/repo/branch/commit/hash1?path=path')
  })

  it('should render commit date', () => {
    render(<Commit commit={mockCommit1} repo="repo" branch="branch" path="path" />, { wrapper: routerWrapper })
    expect(screen.getByText('Commited about 1 month ago by')).toBeInTheDocument()
  })

  it('should render commit author', () => {
    render(<Commit commit={mockCommit1} repo="repo" branch="branch" path="path" />, { wrapper: routerWrapper })
    expect(screen.getByText('author1')).toBeInTheDocument()
  })

  it('should render commit hash', () => {
    render(<Commit commit={mockCommit1} repo="repo" branch="branch" path="path" />, { wrapper: routerWrapper })
    expect(screen.getByText('hash1')).toBeInTheDocument()
  })

  it('should disable hash button if copy is not authorized', () => {
    render(<Commit commit={mockCommit1} repo="repo" branch="branch" path="path" />, { wrapper: routerWrapper })
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('should enable hash button if copy is authorized', () => {
    mock(useCopy).mockReturnValue([true, { loading: false }, jest.fn()])
    render(<Commit commit={mockCommit1} repo="repo" branch="branch" path="path" />, { wrapper: routerWrapper })
    expect(screen.getByRole('button')).toBeEnabled()
  })

  it('should copy hash to clipboard when clicking on hash button', () => {
    const copy = jest.fn()
    mock(useCopy).mockReturnValue([true, { loading: false }, copy])
    render(<Commit commit={mockCommit1} repo="repo" branch="branch" path="path" />, { wrapper: routerWrapper })
    fireEvent.click(screen.getByRole('button'))
    expect(copy).toHaveBeenCalledWith('hash1')
  })
})
