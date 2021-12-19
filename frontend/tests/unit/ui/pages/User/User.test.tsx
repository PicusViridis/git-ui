import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { User } from '../../../../../src/ui/pages/User/User'
import { useUser } from '../../../../../src/ui/pages/User/useUser'
import { mock } from '../../../../mocks'

jest.mock('../../../../../src/ui/pages/User/useUser')

describe('User', () => {
  beforeEach(() => {
    mock(useUser).mockReturnValue({})
  })

  it('should render username', () => {
    mock(useUser).mockReturnValue({ username: 'username' })
    render(<User />)
    expect(screen.getByDisplayValue('username')).toBeInTheDocument()
  })

  it('should set username', () => {
    const setUsername = jest.fn()
    mock(useUser).mockReturnValue({ username: 'username', setUsername })
    render(<User />)
    fireEvent.change(screen.getByDisplayValue('username'), { target: { value: 'abc' } })
    expect(setUsername).toHaveBeenCalledWith('abc')
  })

  it('should render password', () => {
    mock(useUser).mockReturnValue({ password: 'password' })
    render(<User />)
    expect(screen.getByDisplayValue('password')).toBeInTheDocument()
  })

  it('should set password', () => {
    const setPassword = jest.fn()
    mock(useUser).mockReturnValue({ password: 'password', setPassword })
    render(<User />)
    fireEvent.change(screen.getByDisplayValue('password'), { target: { value: 'abc' } })
    expect(setPassword).toHaveBeenCalledWith('abc')
  })

  it('should submit form', () => {
    const onSubmit = jest.fn().mockImplementation((e) => e.preventDefault())
    mock(useUser).mockReturnValue({ onSubmit })
    render(<User />)
    fireEvent.submit(screen.getByRole('button'))
    expect(onSubmit).toHaveBeenCalled()
  })
})
