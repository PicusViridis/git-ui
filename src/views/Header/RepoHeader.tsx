import React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import { IRepositoryMeta } from '../../models/interfaces'

interface IHeaderProps {
  active: 'files' | 'commits'
  repo: IRepositoryMeta
}

export default function Header({ active, repo }: IHeaderProps): JSX.Element {
  return (
    <div className="px-4" style={{ backgroundColor: '#e9ecef' }}>
      <h1 className="py-4">{repo.name}</h1>
      <Nav tabs className="mb-3">
        <NavItem>
          <NavLink className={active === 'files' ? 'active' : ''} href={`/repo/${repo.name}/files/${repo.branch}`}>
            Files
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={active === 'commits' ? 'active' : ''} href={`/repo/${repo.name}/commits/${repo.branch}`}>
            Commits
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  )
}
