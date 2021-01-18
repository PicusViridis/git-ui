import { join } from 'path'
import React from 'react'
import { BreadcrumbItem, Input } from 'reactstrap'

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

interface INavProps {
  repo: string
  branch: string
  path: string
  branches: string[]
  active: 'files' | 'commits' | 'issues'
}

export function Nav({ repo, branch, branches, path, active }: INavProps): JSX.Element | null {
  if (!repo || active === 'issues') {
    return null
  }

  const breadcrumb = toBreadcrumb(repo, path)

  function isSelected(_branch: string) {
    return _branch === branch
  }

  function isActive(_path: string) {
    return _path === path
  }

  return (
    <>
      <nav className="d-flex align-items-center">
        <Input type="select" style={{ width: 'unset' }} className="branch-select mr-3">
          {branches.map((branch) => (
            <option key={branch} value={`/repo/${repo}/${branch}/${active}?path=${path}`} selected={isSelected(branch)}>
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
