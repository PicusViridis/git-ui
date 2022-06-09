import { IconLogout, IconSettings } from '@tabler/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import { useCurrentTitle } from '../../hooks/useTitle'
import { logout } from '../../services/session'

export function Header(): JSX.Element {
  const title = useCurrentTitle()

  return (
    <>
      <nav aria-label="Main">
        <Link to={'/'}>
          <strong>
            <img src="/favicon.svg" height={16} /> Mini Git
          </strong>
        </Link>

        <Link to={'/users'} className="ml-auto">
          <IconSettings /> Admin
        </Link>

        <button onClick={logout}>
          <IconLogout /> Log out
        </button>
      </nav>

      <header>
        <h1>{title}</h1>
      </header>
    </>
  )
}
