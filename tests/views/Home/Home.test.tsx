import Home, { IHomeProps } from '@/views/Home/Home'
import { render, screen } from '@testing-library/react'
import React from 'react'

describe('Home', () => {
  const props: IHomeProps = {
    repositories: [
      {
        name: 'name',
        updatedAt: '2021-01-01 00:00:00',
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
    expect(screen.getByText('Updated Jan 1, 2021')).toBeInTheDocument()
  })
})
