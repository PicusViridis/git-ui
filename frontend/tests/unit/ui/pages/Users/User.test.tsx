import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { useDeleteUser } from '../../../../../src/ui/pages/Users/useDeleteUser'
import { User } from '../../../../../src/ui/pages/Users/User'
import { mock, mockUser1 } from '../../../../mocks'

jest.mock('../../../../../src/ui/pages/Users/useDeleteUser')

describe('User', () => {
  beforeEach(() => {
    mock(useDeleteUser).mockReturnValue({ canDelete: true, loading: false, onDelete: jest.fn() })
  })

  it('should disable delete button if cannot delete', () => {
    mock(useDeleteUser).mockReturnValue({ canDelete: false, loading: false, onDelete: jest.fn() })
    render(<User user={mockUser1} refresh={jest.fn()} />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('should enable delete button if can delete', () => {
    render(<User user={mockUser1} refresh={jest.fn()} />)
    expect(screen.getByRole('button')).toBeEnabled()
  })

  it('should delete user when clicking on button', () => {
    const onDelete = jest.fn()
    mock(useDeleteUser).mockReturnValue({ canDelete: true, loading: false, onDelete })
    render(<User user={mockUser1} refresh={jest.fn()} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onDelete).toHaveBeenCalled()
  })

  it('should render username', () => {
    render(<User user={mockUser1} refresh={jest.fn()} />)
    expect(screen.getByText('user1')).toBeInTheDocument()
  })

  it('should render creation date', () => {
    render(<User user={mockUser1} refresh={jest.fn()} />)
    expect(screen.getByText('Created at 01/01/2018, 12:00 AM')).toBeInTheDocument()
  })
})
