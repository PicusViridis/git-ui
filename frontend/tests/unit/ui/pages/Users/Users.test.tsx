import { useFetch } from '@saramorillon/hooks'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IUserProps } from '../../../../../src/ui/pages/Users/User'
import { Users } from '../../../../../src/ui/pages/Users/Users'
import { mock, mockUser1, mockUser2 } from '../../../../mocks'

jest.mock('react-router-dom')
jest.mock('@saramorillon/hooks')
jest.mock('../../../../../src/ui/pages/Users/User', () => ({
  User: ({ user }: IUserProps) => <div>{user.username}</div>,
}))

describe('Users', () => {
  it('should show loader when loading', () => {
    mock(useFetch).mockReturnValue([[], { loading: true }, jest.fn()])
    render(<Users />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('should navigate to user page when clicking on create user', () => {
    const navigate = jest.fn()
    mock(useNavigate).mockReturnValue(navigate)
    mock(useFetch).mockReturnValue([[], { loading: false }, jest.fn()])
    render(<Users />)
    fireEvent.click(screen.getByRole('button'))
    expect(navigate).toHaveBeenCalledWith('/user')
  })

  it('should render user', () => {
    mock(useFetch).mockReturnValue([[mockUser1, mockUser2], { loading: false }, jest.fn()])
    render(<Users />)
    expect(screen.getByText('user1')).toBeInTheDocument()
    expect(screen.getByText('user2')).toBeInTheDocument()
  })
})
