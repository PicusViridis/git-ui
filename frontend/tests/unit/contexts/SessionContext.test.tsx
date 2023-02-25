import { screen } from '@testing-library/react'
import React, { PropsWithChildren, useContext } from 'react'
import { SessionContext, SessionProvider, useSession } from '../../../src/contexts/SessionContext'
import { getSession } from '../../../src/services/session'
import { mock, renderAsync, renderHookAsync } from '../../mocks'

jest.mock('../../../src/services/session')

function wrapper({ children }: PropsWithChildren<unknown>) {
  return <SessionProvider>{children}</SessionProvider>
}

describe('SessionContext', () => {
  beforeEach(() => {
    mock(getSession).mockResolvedValue('session')
  })

  it('should render children', async () => {
    await renderAsync(<div>In provider</div>, { wrapper })
    expect(screen.getByText('In provider')).toBeInTheDocument()
  })

  it('should return session', async () => {
    const { result } = await renderHookAsync(() => useContext(SessionContext), { wrapper })
    expect(result.current).toEqual('session')
  })
})

describe('useSession', () => {
  beforeEach(() => {
    mock(getSession).mockResolvedValue('session')
  })

  it('should throw if context is used outside a Provider', async () => {
    const { result } = await renderHookAsync(() => useSession())
    expect(result.error?.message).toBe('No session found')
  })

  it('should return session', async () => {
    const { result } = await renderHookAsync(() => useSession(), { wrapper })
    expect(result.current).toBe('session')
  })
})
