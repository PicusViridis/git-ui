import { render, screen } from '@testing-library/react'
import React from 'react'
import Header from '../../../src/views/Header/RepoHeader'
import { mockRepositoryMeta } from '../../__mocks__/fixtures'

describe('Header', () => {
  it('should render repo name', () => {
    render(<Header repo={mockRepositoryMeta} active="commits" />)
    expect(screen.queryByText('test-repo')).toBeInTheDocument()
  })

  it('should render files link', () => {
    render(<Header repo={mockRepositoryMeta} active="commits" />)
    expect(screen.queryByText('Files')).toHaveAttribute('href', '/repo/test-repo/files/test-branch-1')
  })

  it('should render commits link', () => {
    render(<Header repo={mockRepositoryMeta} active="commits" />)
    expect(screen.queryByText('Commits')).toHaveAttribute('href', '/repo/test-repo/commits/test-branch-1')
  })
})
