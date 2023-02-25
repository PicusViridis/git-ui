import { fireEvent, screen } from '@testing-library/react'
import React from 'react'
import { useSession } from '../../../../src/contexts/SessionContext'
import { deleteUser, getUsers } from '../../../../src/services/user'
import { Users } from '../../../../src/views/pages/Users'
import { flushPromises, mock, mockUser1, mockUser2, renderAsync, routerWrapper } from '../../../mocks'

jest.mock('../../../../src/contexts/SessionContext')
jest.mock('../../../../src/services/user')

describe('Users', () => {
  beforeEach(() => {
    mock(useSession).mockReturnValue(mockUser1)
    mock(getUsers).mockResolvedValue([mockUser1])
    mock(deleteUser).mockResolvedValue(undefined)
  })

  it('should render create button', async () => {
    await renderAsync(<Users />, { wrapper: routerWrapper })
    expect(screen.getByText('Create user')).toHaveAttribute('href', '/user')
  })

  it('should get users', async () => {
    await renderAsync(<Users />, { wrapper: routerWrapper })
    expect(getUsers).toHaveBeenCalled()
  })

  it('should render username', async () => {
    await renderAsync(<Users />, { wrapper: routerWrapper })
    expect(screen.getByText('user1')).toBeInTheDocument()
  })

  it('should render creation date', async () => {
    await renderAsync(<Users />, { wrapper: routerWrapper })
    expect(screen.getByText('Created at 01/01/2018, 12:00 AM')).toBeInTheDocument()
  })

  it('should not render delete button if user is the user connected', async () => {
    await renderAsync(<Users />, { wrapper: routerWrapper })
    expect(screen.queryByText('Delete')).not.toBeInTheDocument()
  })

  it('should render delete button if user is not the user connected', async () => {
    mock(getUsers).mockResolvedValue([mockUser2])
    await renderAsync(<Users />, { wrapper: routerWrapper })
    expect(screen.getByText('Delete')).toBeInTheDocument()
  })

  it('should delete user when clicking on button', async () => {
    mock(getUsers).mockResolvedValue([mockUser2])
    await renderAsync(<Users />, { wrapper: routerWrapper })
    fireEvent.click(screen.getByText('Delete'))
    await flushPromises()
    expect(deleteUser).toHaveBeenCalledWith(mockUser2)
  })
})
