import { render, screen } from '@testing-library/react'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { SessionContext } from '../../../../src/contexts/SessionContext'
import { useRepoParams } from '../../../../src/hooks/useParams'
import { getBranches } from '../../../../src/services/branch'
import { Footer } from '../../../../src/views/components/Footer'
import { Header } from '../../../../src/views/components/Header'
import { PrivateOutlet, PublicOutlet, RepoOutlet } from '../../../../src/views/components/Outlet'
import { mockSession, wait } from '../../../mocks'

jest.mock('../../../../src/hooks/useParams')
jest.mock('../../../../src/services/app')
jest.mock('../../../../src/services/branch')
jest.mock('../../../../src/views/components/Header')
jest.mock('../../../../src/views/components/Footer')

beforeEach(() => {
  jest.mocked(Header).mockReturnValue(<span>Header</span>)
  jest.mocked(Footer).mockReturnValue(<span>Footer</span>)
})

describe('PublicOutlet', () => {
  it('should redirect to home page if session', () => {
    render(
      <SessionContext.Provider value={mockSession()}>
        <PublicOutlet />
      </SessionContext.Provider>
    )
    expect(screen.getByText('Navigate to /')).toBeInTheDocument()
  })

  it('should render outlet and footer if no session', () => {
    render(
      <SessionContext.Provider value={null}>
        <PublicOutlet />
      </SessionContext.Provider>
    )
    expect(screen.getByText('Outlet')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })
})

describe('PrivateOutlet', () => {
  it('should redirect to login page if no session', () => {
    render(
      <SessionContext.Provider value={null}>
        <PrivateOutlet />
      </SessionContext.Provider>
    )
    expect(screen.getByText('Navigate to /login')).toBeInTheDocument()
  })

  it('should render header, outlet and footer if session', () => {
    render(
      <SessionContext.Provider value={mockSession()}>
        <PrivateOutlet />
      </SessionContext.Provider>
    )
    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Outlet')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })
})

describe('RepoOutlet', () => {
  it('should render nav and oulet when page is tree', async () => {
    jest.mocked(useRepoParams).mockReturnValue({ repo: 'repo', branch: 'branch', path: 'path' })
    jest.mocked(getBranches).mockResolvedValue(['branch1'])
    jest.mocked(useLocation).mockReturnValue({ pathname: '/tree' } as never)
    render(<RepoOutlet />)
    await wait()
    expect(screen.getByText('Files')).toBeInTheDocument()
    expect(screen.getByText('Outlet')).toBeInTheDocument()
  })

  it('should render nav and oulet when page is commits', async () => {
    jest.mocked(useRepoParams).mockReturnValue({ repo: 'repo', branch: 'branch', path: 'path' })
    jest.mocked(getBranches).mockResolvedValue(['branch1'])
    jest.mocked(useLocation).mockReturnValue({ pathname: '/commits' } as never)
    render(<RepoOutlet />)
    await wait()
    expect(screen.getByText('Files')).toBeInTheDocument()
    expect(screen.getByText('Outlet')).toBeInTheDocument()
  })
})
