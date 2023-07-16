import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { useSession } from '../../../../src/contexts/SessionContext'
import { deleteUser, getUsers } from '../../../../src/services/user'
import { Users } from '../../../../src/views/pages/Users'
import { mockUser, wait } from '../../../mocks'

jest.mock('../../../../src/contexts/SessionContext')
jest.mock('../../../../src/services/user')

describe('Users', () => {
  beforeEach(() => {
    jest.mocked(useSession).mockReturnValue(mockUser())
    jest.mocked(getUsers).mockResolvedValue([mockUser()])
    jest.mocked(deleteUser).mockResolvedValue(undefined)
  })

  it('should render create button', async () => {
    render(<Users />)
    await wait()
    expect(screen.getByText('Create user')).toHaveAttribute('href', '/user')
  })

  it('should get users', async () => {
    render(<Users />)
    await wait()
    expect(getUsers).toHaveBeenCalled()
  })

  it('should render loader when loading', async () => {
    render(<Users />)
    expect(screen.getByText('Loading users')).toBeInTheDocument()
    await wait()
  })

  it('should render error on fetch error', async () => {
    jest.mocked(getUsers).mockRejectedValue('Error')
    render(<Users />)
    await wait()
    expect(screen.getByText('Error while loading users')).toBeInTheDocument()
  })

  it('should render not found when no user is found', async () => {
    jest.mocked(getUsers).mockResolvedValue([])
    render(<Users />)
    await wait()
    expect(screen.getByText('No user found')).toBeInTheDocument()
  })

  it('should render username', async () => {
    render(<Users />)
    await wait()
    expect(screen.getByText('user1')).toBeInTheDocument()
  })

  it('should render creation date', async () => {
    render(<Users />)
    await wait()
    expect(screen.getByText('Created at 01/01/2018, 12:00 AM')).toBeInTheDocument()
  })

  it('should not render delete button if user is the user connected', async () => {
    render(<Users />)
    await wait()
    expect(screen.queryByText('Delete')).not.toBeInTheDocument()
  })

  it('should render delete button if user is not the user connected', async () => {
    jest.mocked(getUsers).mockResolvedValue([mockUser({ username: 'user2' })])
    render(<Users />)
    await wait()
    expect(screen.getByText('Delete')).toBeInTheDocument()
  })

  it('should delete user when clicking on button', async () => {
    jest.mocked(getUsers).mockResolvedValue([mockUser({ username: 'user2' })])
    render(<Users />)
    await wait()
    fireEvent.click(screen.getByText('Delete'))
    await wait()
    expect(deleteUser).toHaveBeenCalledWith(mockUser({ username: 'user2' }))
  })
})
