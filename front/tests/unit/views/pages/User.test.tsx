import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { postUser } from '../../../../src/services/user'
import { User } from '../../../../src/views/pages/User'
import { mockNavigate, wait } from '../../../mocks'

vi.mock('../../../../src/services/user')

describe('User', () => {
  beforeEach(() => {
    vi.mocked(postUser).mockResolvedValue(undefined)
    mockNavigate()
  })

  it('should post user when submitting form', async () => {
    render(<User />)
    fireEvent.change(screen.getByLabelText('Username *'), { target: { value: 'name' } })
    fireEvent.change(screen.getByLabelText('Password *'), { target: { value: 'pass' } })
    fireEvent.submit(screen.getByText('Save'))
    expect(postUser).toHaveBeenCalledWith('name', 'pass')
    await wait()
  })

  it('should redirect to users page after creating user', async () => {
    const navigate = mockNavigate()
    render(<User />)
    fireEvent.submit(screen.getByText('Save'))
    await wait()
    expect(navigate).toHaveBeenCalledWith('/users')
  })
})
