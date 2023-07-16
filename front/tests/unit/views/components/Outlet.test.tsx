import { render, screen } from '@testing-library/react'
import React from 'react'
import { SessionContext } from '../../../../src/contexts/SessionContext'
import { Breadcrumb } from '../../../../src/views/components/Breadcrumb'
import { Footer } from '../../../../src/views/components/Footer'
import { Header } from '../../../../src/views/components/Header'
import { Nav } from '../../../../src/views/components/Nav'
import { PrivateOutlet, PublicOutlet, withBreadcrumb, withNav } from '../../../../src/views/components/Outlet'
import { mockSession } from '../../../mocks'

jest.mock('../../../../src/hooks/useParams')
jest.mock('../../../../src/services/app')
jest.mock('../../../../src/services/branch')
jest.mock('../../../../src/views/components/Header')
jest.mock('../../../../src/views/components/Footer')
jest.mock('../../../../src/views/components/Nav')
jest.mock('../../../../src/views/components/Breadcrumb')

beforeEach(() => {
  jest.mocked(Header).mockReturnValue(<span>Header</span>)
  jest.mocked(Footer).mockReturnValue(<span>Footer</span>)
  jest.mocked(Nav).mockReturnValue(<span>Nav</span>)
  jest.mocked(Breadcrumb).mockReturnValue(<span>Breadcrumb</span>)
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

describe('withNav', () => {
  it('should render nav', () => {
    render(withNav('child'))
    expect(screen.getByText('Nav')).toBeInTheDocument()
  })

  it('should render child', () => {
    render(withNav('child'))
    expect(screen.getByText('child')).toBeInTheDocument()
  })
})

describe('withBreadcrumb', () => {
  it('should render breadcrumb', () => {
    render(withBreadcrumb('child'))
    expect(screen.getByText('Breadcrumb')).toBeInTheDocument()
  })

  it('should render child', () => {
    render(withBreadcrumb('child'))
    expect(screen.getByText('child')).toBeInTheDocument()
  })
})
