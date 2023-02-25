import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { postUser } from '../../../../src/services/user'
import { User } from '../../../../src/ui/pages/User'
import { flushPromises, mock, mockNavigate } from '../../../mocks'

jest.mock('../../../../src/services/user')

describe('User', () => {
  beforeEach(() => {
    mock(postUser).mockResolvedValue(undefined)
    mockNavigate()
  })

  it('should post user when submitting form', async () => {
    render(<User />)
    fireEvent.change(screen.getByLabelText('Username *'), { target: { value: 'name' } })
    fireEvent.change(screen.getByLabelText('Password *'), { target: { value: 'pass' } })
    fireEvent.submit(screen.getByText('Save'))
    expect(postUser).toHaveBeenCalledWith('name', 'pass')
    await flushPromises()
  })

  it('should redirect to users page after creating user', async () => {
    const navigate = mockNavigate()
    render(<User />)
    fireEvent.submit(screen.getByText('Save'))
    await flushPromises()
    expect(navigate).toHaveBeenCalledWith('/users')
  })
})
