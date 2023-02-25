import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { useCurrentTitle } from '../../../../src/hooks/useTitle'
import { logout } from '../../../../src/services/session'
import { Header } from '../../../../src/views/components/Header'
import { mock, routerWrapper } from '../../../mocks'

jest.mock('../../../../src/services/session')
jest.mock('../../../../src/hooks/useTitle')

describe('Header', () => {
  it('should render brand', () => {
    render(<Header />, { wrapper: routerWrapper })
    expect(screen.getByRole('link', { name: 'Mini Git' })).toHaveAttribute('href', '/')
  })

  it('should render admin', () => {
    render(<Header />, { wrapper: routerWrapper })
    expect(screen.getByText('Admin')).toHaveAttribute('href', '/users')
  })

  it('should logout when clicking on logout button', () => {
    render(<Header />, { wrapper: routerWrapper })
    fireEvent.click(screen.getByText('Log out'))
    expect(logout).toHaveBeenCalled()
  })

  it('should render title', () => {
    mock(useCurrentTitle).mockReturnValue('title')
    render(<Header />, { wrapper: routerWrapper })
    expect(screen.getByText('title')).toBeInTheDocument()
  })
})
