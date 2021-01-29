import { render, screen } from '@testing-library/react'
import React from 'react'
import File from '../../../src/views/Files/File'
import { mockRepositoryMeta } from '../../mocks/fixtures'

describe('File', () => {
  it('Should render content as is', () => {
    render(<File repo={mockRepositoryMeta} content="<p>Coucou</p>" />)
    expect(screen.queryByText('Coucou')).toBeInTheDocument()
  })

  it('Should render message if content is missing', () => {
    render(<File repo={mockRepositoryMeta} />)
    expect(screen.queryByText('Cannot preview binary file.')).toBeInTheDocument()
  })

  it('Should render file size', () => {
    render(<File repo={mockRepositoryMeta} size="5Mb" />)
    expect(screen.queryByText('5Mb')).toBeInTheDocument()
  })

  it('Should render download link', () => {
    render(<File repo={mockRepositoryMeta} size="5Mb" />)
    expect(screen.queryByText('Download file')).toHaveAttribute(
      'href',
      '/repo/test-repo/download/test-branch-1?path=filepath'
    )
  })
})
