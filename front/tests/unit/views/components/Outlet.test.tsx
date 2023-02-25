import { render, screen } from '@testing-library/react'
import mockdate from 'mockdate'
import React, { PropsWithChildren } from 'react'
import { useLocation } from 'react-router-dom'
import { SessionContext } from '../../../../src/contexts/SessionContext'
import { useRepoParams } from '../../../../src/hooks/useParams'
import { IUser } from '../../../../src/models/User'
import { getApp } from '../../../../src/services/app'
import { getBranches } from '../../../../src/services/branch'
import { PrivateOutlet, PublicOutlet, RepoOutlet } from '../../../../src/views/components/Outlet'
import { mock, mockApp, mockUser1, renderAsync, routerWrapper } from '../../../mocks'

jest.mock('../../../../src/hooks/useParams')
jest.mock('../../../../src/services/app')
jest.mock('../../../../src/services/branch')

mockdate.set('2019-02-01T00:00:00.000Z')

function wrapper(session: IUser | null = null) {
  return function ({ children }: PropsWithChildren<unknown>) {
    return <SessionContext.Provider value={session}>{routerWrapper({ children })}</SessionContext.Provider>
  }
}

describe('PublicOutlet', () => {
  it('should navigate to home page if session', () => {
    render(<PublicOutlet />, { wrapper: wrapper(mockUser1) })
    expect(screen.getByText('Navigate to /')).toBeInTheDocument()
  })

  it('should render login page if no session', () => {
    render(<PublicOutlet />, { wrapper: wrapper() })
    expect(screen.getByText('Log in')).toBeInTheDocument()
  })
})

describe('PrivateOutlet', () => {
  it('should navigate to login page if no session', () => {
    render(<PrivateOutlet />, { wrapper: wrapper() })
    expect(screen.getByText('Navigate to /login')).toBeInTheDocument()
  })

  it('should render header, footer and outlet if session', async () => {
    mock(getApp).mockResolvedValue(mockApp)
    await renderAsync(<PrivateOutlet />, { wrapper: wrapper(mockUser1) })
    expect(screen.getByText('Log out')).toBeInTheDocument()
    expect(screen.getByText('Outlet')).toBeInTheDocument()
    expect(screen.getByText('v1.0.0 © author 2019')).toBeInTheDocument()
  })
})

describe('RepoOutlet', () => {
  it('should render nav and oulet when page is tree', async () => {
    mock(useRepoParams).mockReturnValue({ repo: 'repo', branch: 'branch', path: 'path' })
    mock(getBranches).mockResolvedValue(['branch1'])
    mock(useLocation).mockReturnValue({ pathname: '/tree' })
    await renderAsync(<RepoOutlet />, { wrapper: routerWrapper })
    expect(screen.getByText('Files')).toBeInTheDocument()
    expect(screen.getByText('Outlet')).toBeInTheDocument()
  })

  it('should render nav and oulet when page is commits', async () => {
    mock(useRepoParams).mockReturnValue({ repo: 'repo', branch: 'branch', path: 'path' })
    mock(getBranches).mockResolvedValue(['branch1'])
    mock(useLocation).mockReturnValue({ pathname: '/commits' })
    await renderAsync(<RepoOutlet />, { wrapper: routerWrapper })
    expect(screen.getByText('Files')).toBeInTheDocument()
    expect(screen.getByText('Outlet')).toBeInTheDocument()
  })
})
