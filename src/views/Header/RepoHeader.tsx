import React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import { IRepositoryMeta } from '../../models/interfaces'
import { getQueryString } from '../utils'

interface IHeaderProps {
  active: 'files' | 'commits' | 'issues'
  meta: IRepositoryMeta
}

export default function Header({ active, meta }: IHeaderProps): JSX.Element {
  const query = getQueryString(meta)

  return (
    <div className="px-4" style={{ backgroundColor: '#e9ecef' }}>
      <h1 className="py-4">{meta.repo}</h1>
      <Nav tabs className="mb-3">
        <NavItem>
          <NavLink className={active === 'files' ? 'active' : ''} href={`/files?${query}`}>
            Files
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={active === 'commits' ? 'active' : ''} href={`/commits?${query}`}>
            Commits
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={active === 'issues' ? 'active' : ''} href={`/issues/list`}>
            Issues
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  )
}
