import { render, screen } from '@testing-library/react'
import React from 'react'
import Issues, { IIssuesProps } from '../../../src/views/Issues/Issues'
import { mockIssue1, mockIssue2 } from '../../mocks/fixtures'

describe('Issues', () => {
  const props: IIssuesProps = {
    issues: [mockIssue1, mockIssue2],
    repo: 'repo',
  }

  it('should render create button', () => {
    render(<Issues {...props} />)
    expect(screen.getByText('Create issue')).toHaveAttribute('href', '/repo/repo/issues/edit')
  })

  it('should render messages when no issues', () => {
    render(<Issues {...props} issues={[]} />)
    expect(screen.getByText('No issue found')).toBeInTheDocument()
  })

  it('should render issue title', () => {
    render(<Issues {...props} />)
    expect(screen.getByText('title1')).toBeInTheDocument()
  })

  it('should render issue link', () => {
    render(<Issues {...props} />)
    expect(screen.getByText('title1')).toHaveAttribute('href', '/repo/repo/issues/edit/1')
  })

  it('should render issue type', () => {
    render(<Issues {...props} />)
    expect(screen.getByText('title1').firstChild).toHaveClass('bg-danger')
  })
})
