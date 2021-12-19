import { useFetch } from '@saramorillon/hooks'
import { useCallback } from 'react'
import { useRepoParams } from '../../../hooks/useParams'
import { getTree } from '../../../services/tree'

export function useTree() {
  const { repo, branch, path } = useRepoParams()
  const fetch = useCallback(() => getTree(repo, branch, path), [repo, branch, path])
  const [tree, { loading }] = useFetch(fetch, [])

  return { tree, loading, repo }
}
