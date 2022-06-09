import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight } from '@tabler/icons'
import React from 'react'
import { LoadContainer } from '../../components/LoadContainer'
import { Commit } from './Commit'
import { useCommits } from './useCommits'

export function Commits(): JSX.Element {
  const { commits, loading, repo, branch, path, ...pagination } = useCommits(10)
  const { page, maxPage, first, previous, next, last, canPrevious, canNext } = pagination

  return (
    <LoadContainer loading={loading}>
      {commits.map((commit) => (
        <Commit key={commit.hash} commit={commit} repo={repo} branch={branch} path={path} />
      ))}
      <div className="center">
        <button disabled={!canPrevious} onClick={first}>
          <IconChevronsLeft />
        </button>
        <button disabled={!canPrevious} onClick={previous}>
          <IconChevronLeft />
        </button>
        <span className="mx1">
          Page {page} of {maxPage}
        </span>
        <button disabled={!canNext} onClick={next}>
          <IconChevronRight />
        </button>
        <button disabled={!canNext} onClick={last}>
          <IconChevronsRight />
        </button>
      </div>
    </LoadContainer>
  )
}
