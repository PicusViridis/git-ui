import { renderHook } from '@testing-library/react-hooks'
import { FormEvent } from 'react'
import { act } from 'react-dom/test-utils'
import { useNavigate } from 'react-router-dom'
import { postUser } from '../../../../../src/services/user'
import { useUser } from '../../../../../src/ui/pages/User/useUser'
import { mock } from '../../../../mocks'

jest.mock('react-router-dom')
jest.mock('../../../../../src/services/user')

describe('useUser', () => {
  it('should return username, username modifier, password, password modifier, and submit function', () => {
    const { result } = renderHook(() => useUser())
    expect(result.current).toEqual({
      loading: false,
      username: '',
      setUsername: expect.any(Function),
      password: '',
      setPassword: expect.any(Function),
      onSubmit: expect.any(Function),
    })
  })

  it('should be loading when submitting', () => {
    mock(useNavigate).mockReturnValue(jest.fn())
    mock(postUser).mockResolvedValue(undefined)
    const { result } = renderHook(() => useUser())
    act(() => result.current.onSubmit({ preventDefault: jest.fn() } as unknown as FormEvent))
    expect(result.current.loading).toBe(true)
  })

  it('should post user when submitting', () => {
    mock(useNavigate).mockReturnValue(jest.fn())
    mock(postUser).mockResolvedValue(undefined)
    const { result } = renderHook(() => useUser())
    act(() => result.current.onSubmit({ preventDefault: jest.fn() } as unknown as FormEvent))
    expect(postUser).toHaveBeenCalledWith('', '')
  })

  it('should navigate to users page after submit', async () => {
    const navigate = jest.fn()
    mock(useNavigate).mockReturnValue(navigate)
    mock(postUser).mockResolvedValue(undefined)
    const { result } = renderHook(() => useUser())
    await act(async () => result.current.onSubmit({ preventDefault: jest.fn() } as unknown as FormEvent))
    expect(navigate).toHaveBeenCalledWith('/users')
  })
})
