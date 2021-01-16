import React from 'react'
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap'
import { User } from '../../models/User'

interface IHeaderProps {
  user?: User
}

export default function Header({ user }: IHeaderProps): JSX.Element {
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
    </header>
  )
}
