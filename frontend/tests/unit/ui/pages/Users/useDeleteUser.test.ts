import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react-dom/test-utils'
import { useSession } from '../../../../../src/contexts/SessionContext'
import { deleteUser } from '../../../../../src/services/user'
import { useDeleteUser } from '../../../../../src/ui/pages/Users/useDeleteUser'
import { flushPromises, mock, mockUser1, mockUser2 } from '../../../../mocks'

jest.mock('../../../../../src/contexts/SessionContext')
jest.mock('../../../../../src/services/user')

describe('useDeleteUser', () => {
  beforeEach(() => {
    mock(useSession).mockReturnValue(mockUser1)
  })

  it('should return loading, false, and delete function when user is session user', () => {
    const { result } = renderHook(() => useDeleteUser(mockUser1, jest.fn()))
    expect(result.current).toEqual({
      loading: false,
      canDelete: false,
      onDelete: expect.any(Function),
    })
  })

  it('should return loading, true, and delete function when user is not session user', () => {
    mock(useSession).mockReturnValue(mockUser2)
    const { result } = renderHook(() => useDeleteUser(mockUser1, jest.fn()))
    expect(result.current).toEqual({
      loading: false,
      canDelete: true,
      onDelete: expect.any(Function),
    })
  })

  it('should be loading when deleting', async () => {
    mock(deleteUser).mockResolvedValue(undefined)
    const { result } = renderHook(() => useDeleteUser(mockUser1, jest.fn()))
    act(() => result.current.onDelete())
    expect(result.current.loading).toBe(true)
    await flushPromises()
  })

  it('should delete user when deleting', async () => {
    mock(deleteUser).mockResolvedValue(undefined)
    const { result } = renderHook(() => useDeleteUser(mockUser1, jest.fn()))
    act(() => result.current.onDelete())
    expect(deleteUser).toHaveBeenCalledWith(mockUser1)
    await flushPromises()
  })

  it('should refresh after deleting', async () => {
    const refresh = jest.fn()
    mock(deleteUser).mockResolvedValue(undefined)
    const { result } = renderHook(() => useDeleteUser(mockUser1, refresh))
    await act(async () => result.current.onDelete())
    expect(refresh).toHaveBeenCalledWith()
  })
})
