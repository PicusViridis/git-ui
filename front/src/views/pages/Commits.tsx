import { useCopy, useFetch, usePagination } from '@saramorillon/hooks'
import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight, IconClipboard } from '@tabler/icons'
import { formatDistance, parseISO } from 'date-fns'
import React, { Fragment, useCallback, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { ICommit } from '../../../../models/Commit'
import { useRepoParams } from '../../hooks/useParams'
import { getCommits } from '../../services/commit'
import { makeUrl } from '../../utils/utils'
import { LoadContainer } from '../components/LoadContainer'

const limit = 10

export function Commits(): JSX.Element {
  const { page, setMaxPage, maxPage, first, previous, next, last, canPrevious, canNext } = usePagination()
  const { repo, branch, path } = useRepoParams()
  const fetch = useCallback(() => getCommits(repo, branch, page, limit, path), [repo, branch, path, page])
  const [{ commits, total }, { loading }] = useFetch(fetch, { commits: [], total: 0 })
  const [authorized, , copy] = useCopy()

  useEffect(() => {
    setMaxPage(Math.ceil(total / limit))
  }, [total, setMaxPage])

  return (
    <LoadContainer loading={loading}>
      {commits.map((commit) => (
        <Fragment key={commit.hash}>
          <div className="flex justify-between items-center py1">
            <div>
              <NavLink to={makeUrl(repo, branch, `commit/${commit.hash}`, path)}>{commit.message}</NavLink>
              <br />
              <small>
                Commited {date(commit)} by <b>{commit.author}</b>
              </small>
            </div>
            <button disabled={!authorized} onClick={() => copy(commit.hash)} className="hash">
              <IconClipboard /> {commit.hash.slice(0, 7)}
            </button>
          </div>
          <hr />
        </Fragment>
      ))}
      <div className="center">
        <button disabled={!canPrevious} onClick={first} aria-label="First">
          <IconChevronsLeft />
        </button>
        <button disabled={!canPrevious} onClick={previous} aria-label="Previous">
          <IconChevronLeft />
        </button>
        <span className="mx1">
          Page {page} of {maxPage}
        </span>
        <button disabled={!canNext} onClick={next} aria-label="Next">
          <IconChevronRight />
        </button>
        <button disabled={!canNext} onClick={last} aria-label="Last">
          <IconChevronsRight />
        </button>
      </div>
    </LoadContainer>
  )
}

function date(commit: ICommit) {
  return formatDistance(parseISO(commit.date), Date.now(), { addSuffix: true })
}
