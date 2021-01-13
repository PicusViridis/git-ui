import { render, screen } from '@testing-library/react'
import React from 'react'
import Files from '../../../src/views/repo/Files'
import { mockFile, mockRepositoryMeta } from '../../__mocks__/fixtures'

describe('Files', () => {
  it('should render file name', () => {
    render(<Files repo={mockRepositoryMeta} files={[mockFile]} />)
    expect(screen.queryByText('file name')).toBeInTheDocument()
  })

  it('should render last commit message', () => {
    render(<Files repo={mockRepositoryMeta} files={[mockFile]} />)
    expect(screen.queryByText('test commit message')).toBeInTheDocument()
  })

  it('should render last commit date', () => {
    render(<Files repo={mockRepositoryMeta} files={[mockFile]} />)
    expect(screen.queryByText('last commit date')).toBeInTheDocument()
  })

  it('should render file link', () => {
    render(<Files repo={mockRepositoryMeta} files={[mockFile]} />)
    expect(screen.queryByText('file name')).toHaveAttribute('href', '/repo/test-repo/file/test-branch-1?path=filepath')
  })

  it('should render file icon', () => {
    const { baseElement } = render(<Files repo={mockRepositoryMeta} files={[mockFile]} />)
    expect(baseElement.querySelector('img')).toHaveAttribute('src', '/icons/file-icon')
  })
})
