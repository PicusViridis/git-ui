import { renderHook } from '@testing-library/react-hooks'
import { FormEvent } from 'react'
import { act } from 'react-dom/test-utils'
import { login } from '../../../../../src/services/session'
import { useLogin } from '../../../../../src/ui/pages/Login/useLogin'
import { mock, mockLocation, restoreLocation } from '../../../../mocks'

jest.mock('../../../../../src/services/session')

describe('useLogin', () => {
  it('should return username, username modifier, password, password modifier, and submit function', () => {
    const { result } = renderHook(() => useLogin())
    expect(result.current).toEqual({
      username: '',
      setUsername: expect.any(Function),
      password: '',
      setPassword: expect.any(Function),
      onSubmit: expect.any(Function),
    })
  })

  it('should login when submitting', () => {
    mock(login).mockResolvedValue(undefined)
    mockLocation({ reload: jest.fn() })
    const { result } = renderHook(() => useLogin())
    act(() => result.current.onSubmit({ preventDefault: jest.fn() } as unknown as FormEvent))
    expect(login).toHaveBeenCalledWith('', '')
    restoreLocation()
  })

  it('should reload page after logging', async () => {
    mock(login).mockResolvedValue(undefined)
    mockLocation({ reload: jest.fn() })
    const { result } = renderHook(() => useLogin())
    await act(async () => result.current.onSubmit({ preventDefault: jest.fn() } as unknown as FormEvent))
    expect(window.location.reload).toHaveBeenCalled()
    restoreLocation()
  })
})
