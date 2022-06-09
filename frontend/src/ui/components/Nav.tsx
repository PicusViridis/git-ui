import React, { useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Page } from '../../../../models/Pages'
import { useRepoParams } from '../../hooks/useParams'
import { makeUrl } from '../../utils/utils'
import { BranchSelector } from './BranchSelector'

export interface INavProps {
  page: Page
}

export function Nav({ page }: INavProps): JSX.Element | null {
  const { repo, branch, path } = useRepoParams()

  return (
    <>
      <div role="tablist">
        <Link role="tab" aria-selected={page === 'tree'} to={makeUrl(repo, branch, 'tree', path)}>
          Files
        </Link>
        <Link role="tab" aria-selected={page === 'commits'} to={makeUrl(repo, branch, 'commits', path)}>
          Commits
        </Link>
      </div>
      <div className="flex items-center">
        {path && (
          <nav aria-label="Breadcrumb">
            <ul>
              <li>
                <BreadcrumbItem text={repo} href={makeUrl(repo, branch, page)} />
              </li>
              <Breadcrumb repo={repo} branch={branch} page={page} path={path} />
            </ul>
          </nav>
        )}
        <div className="ml-auto">
          <BranchSelector repo={repo} branch={branch} page={page} path={path} />
        </div>
      </div>
    </>
  )
}

interface IBreadcrumbProps {
  repo: string
  branch: string
  page: string
  path: string
}

function Breadcrumb({ repo, branch, page, path }: IBreadcrumbProps) {
  const parts = useMemo(() => path.split('/'), [path])

  const getUrl = useCallback(
    (key: number) => {
      if (key < parts.length - 1) {
        return makeUrl(repo, branch, page, parts.slice(0, key + 1).join('/'))
      }
    },
    [repo, branch, page, parts]
  )

  return (
    <>
      {parts.map((item, key) => (
        <li key={key}>
          <BreadcrumbItem text={item} href={getUrl(key)} />
        </li>
      ))}
    </>
  )
}

interface IBreadcrumbItemProps {
  text: string
  href?: string
}

function BreadcrumbItem({ text, href }: IBreadcrumbItemProps) {
  if (href) return <Link to={href}>{text}</Link>
  return <>{text}</>
}
