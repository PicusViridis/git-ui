import { useFetch } from '@saramorillon/hooks'
import { parse } from 'diff2html'
import { useCallback } from 'react'
import { useCommitParams } from '../../../hooks/useParams'
import { getCommit } from '../../../services/commit'

export function useCommit() {
  const { repo, branch, hash } = useCommitParams()
  const fetch = useCallback(() => getCommit(repo, branch, hash), [repo, branch, hash])
  const [commit, { loading }] = useFetch(fetch, null)
  const diffs = commit ? parse(commit.diff) : []
  return { commit, loading, diffs }
}
