import { join } from 'path'
import React from 'react'
import { BreadcrumbItem, Input } from 'reactstrap'
import { Page } from '../../models/Pages'
import { noop } from '../utils'

function toBreadcrumb(repo: string, currentPath: string) {
  const result = [{ name: repo, path: '.' }]
  if (currentPath === '.') {
    return result
  }
  const parts = currentPath.split('/')
  let path = ''
  for (let i = 0; i < parts.length; i++) {
    const name = parts[i]
    path = join(path, name)
    result.push({ name, path })
  }
  return result
}

export interface INavProps {
  repo: string
  branch: string
  path: string
  branches: string[]
  active: Page
}

export function Nav({ repo, branch, branches, path, active }: INavProps): JSX.Element | null {
  if (!repo || active === 'issues' || active === 'releases' || active === 'board') {
    return null
  }

  const breadcrumb = toBreadcrumb(repo, path)

  function isActive(_path: string) {
    return _path === path
  }

  return (
    <>
      <nav className="d-flex align-items-center">
        <Input type="select" style={{ width: 'unset' }} className="branch-select mr-3" value={branch} onChange={noop}>
          {branches.map((branch) => (
            <option key={branch} value={branch} data-href={`/repo/${repo}/${branch}/${active}?path=${path}`}>
              {branch}
            </option>
          ))}
        </Input>
        <ol className="breadcrumb flex-grow-1 mb-0 py-2">
          {breadcrumb.map(({ path, name }) => (
            <BreadcrumbItem key={path} active={isActive(path)}>
              {isActive(path) ? name : <a href={`/repo/${repo}/${branch}/${active}?path=${path}`}>{name}</a>}
            </BreadcrumbItem>
          ))}
        </ol>
      </nav>
      <hr />
    </>
  )
}
