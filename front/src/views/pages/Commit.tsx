import { useFetch } from '@saramorillon/hooks'
import c from 'classnames'
import React, { useCallback } from 'react'
import { useCommitParams } from '../../hooks/useParams'
import { getCommit } from '../../services/commit'
import { Error, Loading, NotFound } from '../components/Helpers'

export function Commit(): JSX.Element {
  const { repo, branch, hash } = useCommitParams()
  const fetch = useCallback(() => getCommit(repo, branch, hash), [repo, branch, hash])
  const [commit, { loading, error }] = useFetch(fetch, null)

  if (loading) {
    return <Loading message="Loading commit" />
  }

  if (error) {
    return <Error message="Error while loading commit" />
  }

  if (!commit) {
    return <NotFound message="Commit not found" />
  }

  return (
    <>
      <h4>{commit.message}</h4>
      {commit.files.map((file) => (
        <article key={file.name} className="my2 p0 pb1">
          <div className="pb1 pt2 px2">
            <mark data-variant="badge" className={c('right', file.status)}>
              {file.status.toUpperCase()}
            </mark>
            <span>{file.name}</span>
          </div>
          <hr />
          <div className="diff">
            {file.lines.map((line, i) => (
              <div key={i}>
                <span className={c('px2', line.left.t)}>{line.left.n}</span>
                <span className={c('px2', line.left.t)}>{line.left.v}</span>
                <span className={c('px2', line.right.t)}>{line.right.n}</span>
                <span className={c('px2', line.right.t)}>{line.right.v}</span>
              </div>
            ))}
          </div>
        </article>
      ))}
    </>
  )
}
