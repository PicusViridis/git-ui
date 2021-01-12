import { render, screen } from '@testing-library/react'
import React from 'react'
import Header from '../../src/views/Header'

describe('Header', () => {
  it('Should show the header button if user is present', () => {
    render(<Header user={{ username: 'user1', password: 'pass1' }} />)
    expect(screen.getByText('Admin')).toBeInTheDocument()
    expect(screen.getByText('Log out')).toBeInTheDocument()
  })

  it('Should not show the header if user is missing', () => {
    render(<Header />)
    expect(screen.queryByText('Admin')).not.toBeInTheDocument()
    expect(screen.queryByText('Log out')).not.toBeInTheDocument()
  })
})
