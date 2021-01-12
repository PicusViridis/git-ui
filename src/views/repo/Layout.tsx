import React, { PropsWithChildren } from 'react'
import { BreadcrumbItem, Container } from 'reactstrap'
import { IBreadcrumb, IRepositoryMeta } from '../../models/interfaces'
import BranchSelect from './BranchSelect'
import Header from './Header'

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
      <Header repo={repo} active={active} />
      <Container>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ol className="breadcrumb flex-grow-1 mb-0 py-2">
            {repo.breadcrumb.map((part) => (
              <BreadcrumbItem key={part.name} active={part.isActive}>
                <BreadcrumbLink item={part} repo={repo} />
              </BreadcrumbItem>
            ))}
          </ol>
          <BranchSelect repo={repo} active={active} />
        </div>
        <hr />
        {children}
      </Container>
    </>
  )
}
