import { useFetch } from '@saramorillon/hooks'
import { parse } from 'diff2html'
import React, { useCallback } from 'react'
import { useCommitParams } from '../../../hooks/useParams'
import { getCommit } from '../../../services/commit'
import { Loader, NotFound } from '../../components/Helpers'
import { Diff } from './Diff'

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
      {parse(commit.diff).map((diff, key) => (
        <Diff key={key} diff={diff} />
      ))}
    </>
  )
}
