import { render, screen } from '@testing-library/react'
import React from 'react'
import { Header, IHeaderProps } from '../../../src/views/Header/Header'
import { mockUser1 } from '../../mocks/fixtures'

describe('Header', () => {
  const props: IHeaderProps = {
    title: 'title',
    repo: '',
    branch: 'branch',
    path: 'path',
    active: 'files',
  }

  it('should show the header button if user is present', () => {
    render(<Header {...props} user={mockUser1} />)
    expect(screen.getByText('Admin')).toBeInTheDocument()
    expect(screen.getByText('Log out')).toBeInTheDocument()
  })

  it('should not show the header if user is missing', () => {
    render(<Header {...props} />)
    expect(screen.queryByText('Admin')).not.toBeInTheDocument()
    expect(screen.queryByText('Log out')).not.toBeInTheDocument()
  })

  it('should render title', () => {
    render(<Header {...props} />)
    expect(screen.queryByText('title')).toBeInTheDocument()
  })

  it('should not render link if no repo', () => {
    render(<Header {...props} />)
    expect(screen.queryByText('Files')).not.toBeInTheDocument()
    expect(screen.queryByText('Commits')).not.toBeInTheDocument()
    expect(screen.queryByText('Issues')).not.toBeInTheDocument()
    expect(screen.queryByText('Releases')).not.toBeInTheDocument()
    expect(screen.queryByText('Board')).not.toBeInTheDocument()
  })

  it('should render links', () => {
    render(<Header {...props} repo="repo" />)
    expect(screen.getByText('Files')).toHaveAttribute('href', '/repo/repo/branch/files?path=path')
    expect(screen.getByText('Commits')).toHaveAttribute('href', '/repo/repo/branch/commits?path=path')
  })
})
