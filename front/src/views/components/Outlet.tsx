import React, { ReactNode, useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { SessionContext } from '../../contexts/SessionContext'
import { Breadcrumb } from './Breadcrumb'
import { Footer } from './Footer'
import { Header } from './Header'
import { Nav } from './Nav'

export function PublicOutlet(): JSX.Element {
  const session = useContext(SessionContext)
  if (session) return <Navigate to="/" />
  return (
    <>
      <main className="mx-auto max-width-2" style={{ minHeight: 'calc(100vh - 162px - 96px)' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export function PrivateOutlet(): JSX.Element {
  const session = useContext(SessionContext)
  if (!session) return <Navigate to="/login" />
  return (
    <>
      <Header />
      <main className="mx-auto" style={{ minHeight: 'calc(100vh - 162px - 96px - 55px)', minWidth: '60rem' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

interface INavOutletProps {
  page: string
  breadcrumb?: boolean
  element: ReactNode
}

export function NavOutlet({ page, breadcrumb = false, element }: INavOutletProps) {
  return (
    <>
      <Nav page={page} />
      {breadcrumb && <Breadcrumb page={page} />}
      {element}
    </>
  )
}
