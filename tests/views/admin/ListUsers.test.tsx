import { render, screen } from '@testing-library/react'
import React from 'react'
import ListUsers from '../../../src/views/Users/Users'

describe('ListUsers', () => {
  const user1 = { id: 1, username: 'user1', password: 'pass1', createdAt: new Date(), updatedAt: new Date() }
  const user2 = { id: 2, username: 'user2', password: 'pass2', createdAt: new Date(), updatedAt: new Date() }

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
    expect(screen.getByRole('link', { name: /Delete/i })).toHaveAttribute('href', '/users/delete-user/user2')
  })
})
