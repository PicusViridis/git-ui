import { render, screen } from '@testing-library/react'
import React, { PropsWithChildren } from 'react'
import { NavigateProps, useLocation } from 'react-router-dom'
import { IUser } from '../../../../../models/User'
import { SessionContext } from '../../../../src/contexts/SessionContext'
import { INavProps } from '../../../../src/ui/components/Nav'
import { PrivateOutlet, PublicOutlet, RepoOutlet } from '../../../../src/ui/components/Outlet'
import { mock, mockUser1 } from '../../../mocks'

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
  Navigate: ({ to }: NavigateProps) => <div>Navigate to {to}</div>,
  Outlet: () => <div>Outlet</div>,
}))
jest.mock('../../../../../src/ui/components/Header/Header', () => ({
  Header: () => <div>Header</div>,
}))
jest.mock('../../../../../src/ui/pages/Login/Login', () => ({
  Login: () => <div>Login</div>,
}))
jest.mock('../../../../../src/ui/components/Footer/Footer', () => ({
  Footer: () => <div>Footer</div>,
}))
jest.mock('../../../../../src/ui/components/Nav/Nav', () => ({
  Nav: ({ page }: INavProps) => <div>Nav {page}</div>,
}))

function wrapper(session: IUser | null = null) {
  return function ({ children }: PropsWithChildren<unknown>) {
    return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>
  }
}

describe('PublicOutlet', () => {
  it('should navigate to home page if session', () => {
    render(<PublicOutlet />, { wrapper: wrapper(mockUser1) })
    expect(screen.getByText('Navigate to /')).toBeInTheDocument()
  })

  it('should render login page if no session', () => {
    render(<PublicOutlet />, { wrapper: wrapper() })
    expect(screen.getByText('Login')).toBeInTheDocument()
  })
})

describe('PrivateOutlet', () => {
  it('should navigate to login page if no session', () => {
    render(<PrivateOutlet />, { wrapper: wrapper() })
    expect(screen.getByText('Navigate to /login')).toBeInTheDocument()
  })

  it('should render header, footer and oulet if session', () => {
    render(<PrivateOutlet />, { wrapper: wrapper(mockUser1) })
    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Outlet')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })
})

describe('RepoOutlet', () => {
  it('should render nav and oulet when page is tree', () => {
    mock(useLocation).mockReturnValue({ pathname: '/tree' })
    render(<RepoOutlet />)
    expect(screen.getByText('Nav tree')).toBeInTheDocument()
    expect(screen.getByText('Outlet')).toBeInTheDocument()
  })

  it('should render nav and oulet when page is commits', () => {
    mock(useLocation).mockReturnValue({ pathname: '/commits' })
    render(<RepoOutlet />)
    expect(screen.getByText('Nav commits')).toBeInTheDocument()
    expect(screen.getByText('Outlet')).toBeInTheDocument()
  })
})
