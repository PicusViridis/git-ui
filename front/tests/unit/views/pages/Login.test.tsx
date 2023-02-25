import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { login } from '../../../../src/services/session'
import { Login } from '../../../../src/views/pages/Login'
import { flushPromises, mock, mockLocation, restoreLocation } from '../../../mocks'

jest.mock('../../../../src/services/session')

describe('Login', () => {
  beforeEach(() => {
    mock(login).mockResolvedValue(undefined)
    mockLocation({ reload: jest.fn() })
  })

  afterEach(() => {
    restoreLocation()
  })

  it('should login when submitting form', async () => {
    render(<Login />)
    fireEvent.change(screen.getByLabelText('Username *'), { target: { value: 'name' } })
    fireEvent.change(screen.getByLabelText('Password *'), { target: { value: 'pass' } })
    fireEvent.submit(screen.getByText('Log in'))
    expect(login).toHaveBeenCalledWith('name', 'pass')
    await flushPromises()
  })

  it('should reload page after login', async () => {
    render(<Login />)
    fireEvent.submit(screen.getByRole('button'))
    await flushPromises()
    expect(window.location.reload).toHaveBeenCalled()
  })
})
