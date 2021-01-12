import { render, screen } from '@testing-library/react'
import React from 'react'
import ListUsers from '../../../src/views/admin/ListUsers'

describe('ListUsers', () => {
  const user1 = { username: 'user1', password: 'pass1' }
  const user2 = { username: 'user2', password: 'pass2' }

  it('Should render each user', () => {
    render(<ListUsers user={user1} users={[user1, user2]} />)
    expect(screen.getByText('user1')).toBeInTheDocument()
    expect(screen.getByText('user2')).toBeInTheDocument()
  })

  it('Should disabled delete if user is the same as session user', () => {
    render(<ListUsers user={user1} users={[user1]} />)
    expect(screen.getByRole('button', { name: /Delete/i })).toBeDisabled()
  })

  it('Should enable delete if user is the same as session user', () => {
    render(<ListUsers user={user1} users={[user2]} />)
    expect(screen.getByRole('link', { name: /Delete/i })).toHaveAttribute('href', '/admin/delete-user/user2')
  })
})
