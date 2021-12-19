import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { Login } from '../../../../../src/ui/pages/Login/Login'
import { useLogin } from '../../../../../src/ui/pages/Login/useLogin'
import { mock } from '../../../../mocks'

jest.mock('../../../../../src/ui/pages/Login/useLogin')

describe('Login', () => {
  beforeEach(() => {
    mock(useLogin).mockReturnValue({})
  })

  it('should render username', () => {
    mock(useLogin).mockReturnValue({ username: 'username' })
    render(<Login />)
    expect(screen.getByDisplayValue('username')).toBeInTheDocument()
  })

  it('should set username', () => {
    const setUsername = jest.fn()
    mock(useLogin).mockReturnValue({ username: 'username', setUsername })
    render(<Login />)
    fireEvent.change(screen.getByDisplayValue('username'), { target: { value: 'abc' } })
    expect(setUsername).toHaveBeenCalledWith('abc')
  })

  it('should render password', () => {
    mock(useLogin).mockReturnValue({ password: 'password' })
    render(<Login />)
    expect(screen.getByDisplayValue('password')).toBeInTheDocument()
  })

  it('should set password', () => {
    const setPassword = jest.fn()
    mock(useLogin).mockReturnValue({ password: 'password', setPassword })
    render(<Login />)
    fireEvent.change(screen.getByDisplayValue('password'), { target: { value: 'abc' } })
    expect(setPassword).toHaveBeenCalledWith('abc')
  })

  it('should submit form', () => {
    const onSubmit = jest.fn().mockImplementation((e) => e.preventDefault())
    mock(useLogin).mockReturnValue({ onSubmit })
    render(<Login />)
    fireEvent.submit(screen.getByRole('button'))
    expect(onSubmit).toHaveBeenCalled()
  })
})
