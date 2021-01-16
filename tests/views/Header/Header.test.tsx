import { render, screen } from '@testing-library/react'
import React from 'react'
import Header from '../../../src/views/Header/Header'
import { mockUser1 } from '../../__mocks__/fixtures'

describe('Header', () => {
  it('Should show the header button if user is present', () => {
    render(<Header user={mockUser1} />)
    expect(screen.getByText('Admin')).toBeInTheDocument()
    expect(screen.getByText('Log out')).toBeInTheDocument()
  })

  it('Should not show the header if user is missing', () => {
    render(<Header />)
    expect(screen.queryByText('Admin')).not.toBeInTheDocument()
    expect(screen.queryByText('Log out')).not.toBeInTheDocument()
  })
})
