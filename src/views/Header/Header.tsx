import React from 'react'
import { Jumbotron, Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap'
import { User } from '../../models/User'

interface IHeaderProps {
  user?: User
  repo?: string
  path: string
  query: string
}

export function Header({ user, repo, path, query }: IHeaderProps): JSX.Element {
  return (
    <header>
      <Navbar color="primary" dark expand="md">
        <NavbarBrand href="/">Git UI</NavbarBrand>
        {user && (
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/users/list">Admin</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/logout">Log out</NavLink>
            </NavItem>
          </Nav>
        )}
      </Navbar>
      <Jumbotron className="py-0">
        <h1 className="py-5 m-0">{repo || 'Repositories'}</h1>
        {repo && (
          <Nav tabs className="mb-3">
            <NavItem>
              <NavLink className={path.startsWith('/file') ? 'active' : ''} href={`/files?${query}`}>
                Files
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={path.startsWith('/commit') ? 'active' : ''} href={`/commits?${query}`}>
                Commits
              </NavLink>
            </NavItem>
          </Nav>
        )}
      </Jumbotron>
    </header>
  )
}
