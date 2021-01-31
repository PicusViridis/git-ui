import { render, screen } from '@testing-library/react'
import React from 'react'
import { INavProps, Nav } from '../../../src/views/Nav/Nav'

describe('Nav', () => {
  const props: INavProps = {
    repo: 'repo',
    branch: 'active branch',
    path: 'current/path',
    branches: ['active branch', 'other branch'],
    active: 'files',
  }

  it('should render nothing if no repo', () => {
    const { baseElement } = render(<Nav {...props} repo="" />)
    expect(baseElement.firstChild).toBeEmptyDOMElement()
  })

  it('should render nothing if active page is issues', () => {
    const { baseElement } = render(<Nav {...props} active="issues" />)
    expect(baseElement.firstChild).toBeEmptyDOMElement()
  })

  it('should render nothing if active page is releases', () => {
    const { baseElement } = render(<Nav {...props} active="releases" />)
    expect(baseElement.firstChild).toBeEmptyDOMElement()
  })

  it('should render nothing if active page is board', () => {
    const { baseElement } = render(<Nav {...props} active="board" />)
    expect(baseElement.firstChild).toBeEmptyDOMElement()
  })

  it('should render current branch name', () => {
    render(<Nav {...props} />)
    expect(screen.getByDisplayValue('active branch')).toBeInTheDocument()
  })

  it('should render branches options', () => {
    render(<Nav {...props} />)
    expect(screen.getByText('active branch')).toBeInTheDocument()
    expect(screen.getByText('other branch')).toBeInTheDocument()
  })

  it('should render current branch href', () => {
    render(<Nav {...props} />)
    expect(screen.getByText('active branch')).toHaveAttribute(
      'data-href',
      '/repo/repo/active branch/files?path=current/path'
    )
  })

  it('should render non active breadcrumb items', () => {
    render(<Nav {...props} />)
    expect(screen.getByText('current')).toBeInTheDocument()
  })

  it('should render href for non active breadcrumb items', () => {
    render(<Nav {...props} />)
    expect(screen.getByText('current')).toHaveAttribute('href', '/repo/repo/active branch/files?path=current')
  })

  it('should render active breadcrumb items', () => {
    render(<Nav {...props} />)
    expect(screen.getByText('path')).toBeInTheDocument()
  })

  it('should not render href for active breadcrumb items', () => {
    render(<Nav {...props} />)
    expect(screen.getByText('path')).not.toHaveAttribute('href')
  })
})
