import React, { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Page } from '../../../../models/Pages'
import { SessionContext } from '../../contexts/SessionContext'
import { Login } from '../pages/Login/Login'
import { Footer } from './Footer'
import { Header } from './Header'
import { Nav } from './Nav'

export function PublicOutlet() {
  const session = useContext(SessionContext)
  if (session) return <Navigate to="/" />
  return <Login />
}

export function PrivateOutlet() {
  const session = useContext(SessionContext)
  if (!session) return <Navigate to="/login" />
  return (
    <>
      <Header />
      <main className="mx-auto flex-auto" style={{ minHeight: 'calc(100vh - 555px)', minWidth: '60rem' }}>
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
