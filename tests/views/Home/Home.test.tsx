import { render, screen } from '@testing-library/react'
import React from 'react'
import Home, { IHomeProps } from '../../../src/views/Home/Home'

describe('Home', () => {
  const props: IHomeProps = {
    repositories: [
      {
        name: 'name',
        lastUpdateDate: 'lastUpdateDate',
      },
    ],
  }

  it('should render repository name', () => {
    render(<Home {...props} />)
    expect(screen.getByText('name')).toBeInTheDocument()
  })

  it('should render repository link', () => {
    render(<Home {...props} />)
    expect(screen.getByText('name').parentElement).toHaveAttribute('href', '/repo/name/master/files')
  })

  it('should render repository date', () => {
    render(<Home {...props} />)
    expect(screen.getByText('Updated lastUpdateDate')).toBeInTheDocument()
  })
})
