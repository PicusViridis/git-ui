import React, { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { SessionContext } from '../../contexts/SessionContext'
import { Page } from '../../models/Pages'
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

export function RepoOutlet() {
  const { pathname } = useLocation()
  const page: Page = pathname.includes('/tree') ? 'tree' : 'commits'
  return (
    <>
      <Nav page={page} />
      <Outlet />
    </>
  )
}
