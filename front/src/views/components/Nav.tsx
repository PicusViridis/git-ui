import React from 'react'
import { Link } from 'react-router-dom'
import { usePage } from '../../hooks/usePage'
import { useRepoParams } from '../../hooks/useParams'
import { makeUrl } from '../../utils/utils'

export function Nav(): JSX.Element | null {
  const page = usePage()
  const { repo, branch, path } = useRepoParams()

  return (
    <div role="tablist">
      <Link role="tab" aria-selected={page === 'tree'} to={makeUrl(repo, branch, 'tree', path)}>
        Files
      </Link>
      <Link role="tab" aria-selected={page === 'commits'} to={makeUrl(repo, branch, 'commits', path)}>
        Commits
      </Link>
      <Link role="tab" aria-selected={page === 'branches'} to={makeUrl(repo, branch, 'branches', path)}>
        Branches
      </Link>
    </div>
  )
}
