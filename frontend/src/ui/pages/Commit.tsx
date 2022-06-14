import { useFetch } from '@saramorillon/hooks'
import c from 'classnames'
import { parse } from 'diff2html'
import React, { Fragment, useCallback } from 'react'
import { useCommitParams } from '../../hooks/useParams'
import { getCommit } from '../../services/commit'
import { parseDiff } from '../../utils/parseDiff'
import { Loader, NotFound } from '../components/Helpers'

export function Commit(): JSX.Element {
  const { repo, branch, hash } = useCommitParams()
  const fetch = useCallback(() => getCommit(repo, branch, hash), [repo, branch, hash])
  const [commit, { loading }] = useFetch(fetch, null)

  if (loading) {
    return <Loader />
  }

  if (!commit) {
    return <NotFound />
  }

  return (
    <>
      <h4>{commit.message}</h4>
      {parse(commit.diff)
        .map(parseDiff)
        .map((diff, key) => (
          <article key={key} className="my2 p0 pb1">
            <div className="pb1 pt2 px2">
              <mark data-variant="badge" className={c('right', diff.status)}>
                {diff.status.toUpperCase()}
              </mark>
              <span>{diff.name}</span>
            </div>
            <hr />
            <div className="diff">
              {diff.lines.map((line, i) => (
                <div key={i}>
                  {line.map((cell, j) => (
                    <Fragment key={j}>
                      <span className={c('px2', cell.t)}>{cell.n}</span>
                      <span className={c('px2', cell.t)}>{cell.v?.replace(/\+|-/, ' ')}</span>
                    </Fragment>
                  ))}
                </div>
              ))}
            </div>
          </article>
        ))}
    </>
  )
}
