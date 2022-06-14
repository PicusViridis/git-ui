import { useFetch, usePagination } from '@saramorillon/hooks'
import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight } from '@tabler/icons'
import React, { useCallback, useEffect } from 'react'
import { useRepoParams } from '../../../hooks/useParams'
import { getCommits } from '../../../services/commit'
import { LoadContainer } from '../../components/LoadContainer'
import { Commit } from './Commit'

const limit = 10

export function Commits(): JSX.Element {
  const { page, setMaxPage, maxPage, first, previous, next, last, canPrevious, canNext } = usePagination()
  const { repo, branch, path } = useRepoParams()
  const fetch = useCallback(() => getCommits(repo, branch, page, limit, path), [repo, branch, path, page])
  const [{ commits, total }, { loading }] = useFetch(fetch, { commits: [], total: 0 })

  useEffect(() => {
    setMaxPage(Math.ceil(total / limit))
  }, [total, setMaxPage])

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
