import { render, screen } from '@testing-library/react'
import React from 'react'
import Home from '../../src/views/Home'
import { mockRepository } from '../__mocks__/fixtures'

describe('Home', () => {
  it('Should render repository name', () => {
    render(<Home repositories={[mockRepository]} />)
    expect(screen.queryByText('test-repo')).toBeInTheDocument()
  })

  it('Should render repository link', () => {
    render(<Home repositories={[mockRepository]} />)
    expect(screen.queryByText('test-repo').parentElement).toHaveAttribute('href', '/repo/test-repo/files')
  })

  it('Should render repository date', () => {
    render(<Home repositories={[mockRepository]} />)
    expect(screen.queryByText('Updated last commit date')).toBeInTheDocument()
  })
})
