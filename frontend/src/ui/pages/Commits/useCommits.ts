import { useFetch, usePagination } from '@saramorillon/hooks'
import { useCallback, useEffect } from 'react'
import { useRepoParams } from '../../../hooks/useParams'
import { getCommits } from '../../../services/commit'

export function useCommits(limit: number) {
  const { page, setMaxPage, ...pagination } = usePagination()
  const { repo, branch, path } = useRepoParams()
  const fetch = useCallback(() => getCommits(repo, branch, page, limit, path), [repo, branch, path, page, limit])
  const [{ commits, total }, { loading }] = useFetch(fetch, { commits: [], total: 0 })

  useEffect(() => {
    setMaxPage(Math.ceil(total / limit))
  }, [total, setMaxPage, limit])

  return { commits, loading, repo, branch, path, page, ...pagination }
}
