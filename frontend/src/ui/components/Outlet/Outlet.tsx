import React, { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Page } from '../../../../../models/Pages'
import { SessionContext } from '../../../contexts/SessionContext'
import { Login } from '../../pages/Login/Login'
import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import { Nav } from '../Nav/Nav'

export function PublicOutlet() {
  const session = useContext(SessionContext)
  if (session) return <Navigate to="/" />
  return <Login />
}

export function PrivateOutlet() {
  const session = useContext(SessionContext)
  if (!session) return <Navigate to="/login" />
  return (
    <div className="flex flex-column items-stretch" style={{ minHeight: '100vh' }}>
      <Header />
      <div className="py2 max-width-4 mx-auto flex-auto" style={{ minWidth: '60rem' }}>
        <Outlet />
      </div>
      <Footer />
    </div>
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
