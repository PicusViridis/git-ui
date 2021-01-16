import React from 'react'
import { BreadcrumbItem, Input } from 'reactstrap'

function Branch({ branch, query, selected }: { branch: string; query: string; selected: boolean }) {
  const searchParam = new URLSearchParams(query)
  searchParam.set('branch', branch)
  return (
    <option value={searchParam.toString()} selected={selected}>
      {branch}
    </option>
  )
}

interface INavProps {
  meta?: {
    branch: string
    branches: string[]
  }
  path: string
  query: string
}

export function Nav({ meta, path, query }: INavProps): JSX.Element | null {
  if (!meta) {
    return null
  }

  const breadcrumb = path.split('/').filter(Boolean)

  return (
    <>
      <nav className="d-flex align-items-center">
        <Input type="select" style={{ width: 'unset' }} className="branch-select mr-3">
          {meta.branches.map((branch) => (
            <Branch key={branch} branch={branch} query={query} selected={branch === meta.branch} />
          ))}
        </Input>
        <ol className="breadcrumb flex-grow-1 mb-0 py-2">
          {breadcrumb.map((part, ind, arr) => (
            <BreadcrumbItem key={part} active={ind === arr.length - 1}>
              {ind === arr.length - 1 ? part : <a href={`/files?${query}`}>{part}</a>}
            </BreadcrumbItem>
          ))}
        </ol>
      </nav>
      <hr />
    </>
  )
}
