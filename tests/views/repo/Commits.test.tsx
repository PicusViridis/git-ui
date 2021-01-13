import { render, screen } from '@testing-library/react'
import React from 'react'
import Commits from '../../../src/views/repo/Commits'
import { mockCommit, mockPagination, mockRepositoryMeta } from '../../__mocks__/fixtures'

describe('Commits', () => {
  it('Should render commit message', () => {
    render(<Commits repo={mockRepositoryMeta} commits={[mockCommit]} pagination={mockPagination} />)
    expect(screen.queryByText('test commit message')).toBeInTheDocument()
  })

  it('Should render commit link', () => {
    render(<Commits repo={mockRepositoryMeta} commits={[mockCommit]} pagination={mockPagination} />)
    expect(screen.queryByText('test commit message').parentElement).toHaveAttribute(
      'href',
      '/repo/test-repo/commit/0123456789abcdef'
    )
  })

  it('Should render commit date', () => {
    render(<Commits repo={mockRepositoryMeta} commits={[mockCommit]} pagination={mockPagination} />)
    expect(screen.queryByText('Commited last commit date by')).toBeInTheDocument()
  })

  it('Should render commit author', () => {
    render(<Commits repo={mockRepositoryMeta} commits={[mockCommit]} pagination={mockPagination} />)
    expect(screen.queryByText('test commit author')).toBeInTheDocument()
  })

  it('Should render commit hash', () => {
    render(<Commits repo={mockRepositoryMeta} commits={[mockCommit]} pagination={mockPagination} />)
    expect(screen.queryByDisplayValue('01234567')).toBeInTheDocument()
  })

  it('should disabled first button when first is not available in pagination', () => {
    render(<Commits repo={mockRepositoryMeta} commits={[mockCommit]} pagination={{ ...mockPagination, first: null }} />)
    expect(screen.queryByText('«').parentElement.parentElement).toHaveClass('disabled')
  })

  it('should not disabled first button when first is available in pagination', () => {
    render(<Commits repo={mockRepositoryMeta} commits={[mockCommit]} pagination={mockPagination} />)
    expect(screen.queryByText('«').parentElement.parentElement).not.toHaveClass('disabled')
  })

  it('should render link on first button', () => {
    render(<Commits repo={mockRepositoryMeta} commits={[mockCommit]} pagination={mockPagination} />)
    expect(screen.queryByText('«').parentElement).toHaveAttribute('href', '?page=1')
  })

  it('should disabled previous button when previous is not available in pagination', () => {
    render(
      <Commits repo={mockRepositoryMeta} commits={[mockCommit]} pagination={{ ...mockPagination, previous: null }} />
    )
    expect(screen.queryByText('‹').parentElement.parentElement).toHaveClass('disabled')
  })

  it('should not disabled previous button when previous is available in pagination', () => {
    render(<Commits repo={mockRepositoryMeta} commits={[mockCommit]} pagination={mockPagination} />)
    expect(screen.queryByText('‹').parentElement.parentElement).not.toHaveClass('disabled')
  })

  it('should render link on previous button', () => {
    render(<Commits repo={mockRepositoryMeta} commits={[mockCommit]} pagination={mockPagination} />)
    expect(screen.queryByText('‹').parentElement).toHaveAttribute('href', '?page=4')
  })

  it('should disabled next button when next is not available in pagination', () => {
    render(<Commits repo={mockRepositoryMeta} commits={[mockCommit]} pagination={{ ...mockPagination, next: null }} />)
    expect(screen.queryByText('›').parentElement.parentElement).toHaveClass('disabled')
  })

  it('should not disabled next button when next is available in pagination', () => {
    render(<Commits repo={mockRepositoryMeta} commits={[mockCommit]} pagination={mockPagination} />)
    expect(screen.queryByText('›').parentElement.parentElement).not.toHaveClass('disabled')
  })

  it('should render link on next button', () => {
    render(<Commits repo={mockRepositoryMeta} commits={[mockCommit]} pagination={mockPagination} />)
    expect(screen.queryByText('›').parentElement).toHaveAttribute('href', '?page=6')
  })

  it('should disabled last button when last is not available in pagination', () => {
    render(<Commits repo={mockRepositoryMeta} commits={[mockCommit]} pagination={{ ...mockPagination, last: null }} />)
    expect(screen.queryByText('»').parentElement.parentElement).toHaveClass('disabled')
  })

  it('should not disabled last button when last is available in pagination', () => {
    render(<Commits repo={mockRepositoryMeta} commits={[mockCommit]} pagination={mockPagination} />)
    expect(screen.queryByText('»').parentElement.parentElement).not.toHaveClass('disabled')
  })

  it('should render link on last button', () => {
    render(<Commits repo={mockRepositoryMeta} commits={[mockCommit]} pagination={mockPagination} />)
    expect(screen.queryByText('»').parentElement).toHaveAttribute('href', '?page=8')
  })
})
