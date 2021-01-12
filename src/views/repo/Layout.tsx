import React, { PropsWithChildren } from 'react'
import { BreadcrumbItem, Container, Jumbotron, Nav, NavItem, NavLink } from 'reactstrap'
import { IBreadcrumb, IRepositoryMeta } from '../../models/interfaces'
import BranchSelect from './BranchSelect'

interface IBreadcrumbLinkProps {
  item: IBreadcrumb
  repo: IRepositoryMeta
}

function BreadcrumbLink({ item, repo }: IBreadcrumbLinkProps) {
  if (item.isActive) {
    return <>{item.name}</>
  }

  let href = `/repo/${repo.name}/files/${repo.branch}`
  if (item.path) {
    href += `?path=${item.path}`
  }

  return <a href={href}>{item.name}</a>
}

interface ICommonProps {
  active: string
  repo: IRepositoryMeta
}

export default function Layout({ active, repo, children }: PropsWithChildren<ICommonProps>): JSX.Element {
  return (
    <>
      <Jumbotron>
        <h1>{repo.name}</h1>
        <ul className="p-0 m-0" style={{ display: 'flex' }}>
          {repo.breadcrumb.map((part) => (
            <BreadcrumbItem key={part.name} active={part.isActive}>
              <BreadcrumbLink item={part} repo={repo} />
            </BreadcrumbItem>
          ))}
        </ul>
      </Jumbotron>
      <Container>
        <Nav pills className="mb-3">
          <NavItem>
            <NavLink className={active === 'files' ? 'active' : ''} href={`/repo/${repo.name}/files/${repo.branch}`}>
              Files
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={active === 'commits' ? 'active' : ''}
              href={`/repo/${repo.name}/commits/${repo.branch}`}
            >
              Commits
            </NavLink>
          </NavItem>
          <NavItem style={{ marginLeft: 'auto' }}>
            <BranchSelect repo={repo} active={active} />
          </NavItem>
        </Nav>
        <hr />
        {children}
      </Container>
    </>
  )
}
