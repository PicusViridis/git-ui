import { render, screen } from '@testing-library/react'
import React from 'react'
import { BranchSelect, BreadcrumbLink } from '../../../src/views/repo/Nav'
import { mockBreadcrumb1, mockBreadcrumb2, mockRepositoryMeta } from '../../__mocks__/fixtures'

describe('BranchSelect', () => {
  it('should render branch name', () => {
    render(<BranchSelect repo={mockRepositoryMeta} />)
    expect(screen.queryByText('test-branch-1')).toBeInTheDocument()
    expect(screen.queryByDisplayValue('test-branch-1')).toBeInTheDocument()
  })

  it('should disable branch selector when only one branch is present', () => {
    render(<BranchSelect repo={{ ...mockRepositoryMeta, branches: ['test-branch-1'] }} />)
    expect(screen.getByDisplayValue('test-branch-1')).toBeDisabled()
  })

  it('should not disable branch selector when multiple branches are present', () => {
    render(<BranchSelect repo={mockRepositoryMeta} />)
    expect(screen.getByDisplayValue('test-branch-1')).toBeEnabled()
  })
})

describe('BreadcrumbLink', () => {
  it('should render item name if item is active', () => {
    render(<BreadcrumbLink item={mockBreadcrumb2} repo={mockRepositoryMeta} />)
    expect(screen.queryByText('Path 2')).toBeInTheDocument()
  })

  it('should not render item link if item is active', () => {
    render(<BreadcrumbLink item={mockBreadcrumb2} repo={mockRepositoryMeta} />)
    expect(screen.queryByText('Path 2')).not.toHaveAttribute('href')
  })

  it('should render item name if item is not active', () => {
    render(<BreadcrumbLink item={mockBreadcrumb1} repo={mockRepositoryMeta} />)
    expect(screen.queryByText('Path 1')).toBeInTheDocument()
  })

  it('should render item link if item is not active', () => {
    render(<BreadcrumbLink item={mockBreadcrumb1} repo={mockRepositoryMeta} />)
    expect(screen.queryByText('Path 1')).toHaveAttribute('href', '/repo/test-repo/files/test-branch-1?path=path1')
  })
})
