import React from 'react'
import { BreadcrumbItem, Input } from 'reactstrap'
import { IBreadcrumb, IRepositoryMeta } from '../../models/interfaces'

interface IBranchSelectProps {
  meta: IRepositoryMeta
}

export function BranchSelect({ meta }: IBranchSelectProps): JSX.Element {
  const disabled = meta.branches.length === 1
  return (
    <Input type="select" defaultValue={meta.branch} disabled={disabled} style={{ width: 'unset' }} className="mr-3">
      {meta.branches.map((branch) => (
        <option key={branch} value={branch}>
          {branch}
        </option>
      ))}
    </Input>
  )
}

interface IBreadcrumbLinkProps {
  item: IBreadcrumb
  meta: IRepositoryMeta
}

export function BreadcrumbLink({ item, meta }: IBreadcrumbLinkProps): JSX.Element {
  if (item.isActive) {
    return <>{item.name}</>
  }

  let href = `/files/${meta.branch}`
  if (item.path) {
    href += `?path=${item.path}`
  }

  return <a href={href}>{item.name}</a>
}

interface INavProps {
  meta: IRepositoryMeta
}

export default function Nav({ meta }: INavProps): JSX.Element {
  return (
    <nav className="d-flex align-items-center">
      <BranchSelect meta={meta} />
      <ol className="breadcrumb flex-grow-1 mb-0 py-2">
        {meta.breadcrumb.map((part) => (
          <BreadcrumbItem key={part.name} active={part.isActive}>
            <BreadcrumbLink item={part} meta={meta} />
          </BreadcrumbItem>
        ))}
      </ol>
    </nav>
  )
}
