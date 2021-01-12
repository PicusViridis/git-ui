import React from 'react'
import { BreadcrumbItem, Input } from 'reactstrap'
import { IBreadcrumb, IRepositoryMeta } from '../../models/interfaces'

interface IBranchSelectProps {
  repo: IRepositoryMeta
}

function BranchSelect({ repo }: IBranchSelectProps): JSX.Element {
  const disabled = repo.branches.length === 1
  return (
    <Input type="select" defaultValue={repo.branch} disabled={disabled} style={{ width: 'unset' }} className="mr-3">
      {repo.branches.map((branch) => (
        <option key={branch} value={branch}>
          {branch}
        </option>
      ))}
    </Input>
  )
}

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

interface INavProps {
  repo: IRepositoryMeta
}

export default function Nav({ repo }: INavProps): JSX.Element {
  return (
    <nav className="d-flex align-items-center">
      <BranchSelect repo={repo} />
      <ol className="breadcrumb flex-grow-1 mb-0 py-2">
        {repo.breadcrumb.map((part) => (
          <BreadcrumbItem key={part.name} active={part.isActive}>
            <BreadcrumbLink item={part} repo={repo} />
          </BreadcrumbItem>
        ))}
      </ol>
    </nav>
  )
}
