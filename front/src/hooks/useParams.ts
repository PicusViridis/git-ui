import { useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useTitle } from './useTitle'

interface IRepoParams {
  repo: string
  branch: string
  path: string
}

export function useRepoParams(): IRepoParams {
  const { repo, branch } = useParams<{ repo: string; branch: string }>()
  useTitle(repo || '')
  const { search } = useLocation()
  const path = useMemo(() => new URLSearchParams(search).get('path') || '', [search])
  if (!repo || !branch) throw new Error('Invalid repo params')
  return { repo, branch, path }
}

interface ICommitParams extends IRepoParams {
  hash: string
}

export function useCommitParams(): ICommitParams {
  const { repo, branch, path } = useRepoParams()
  const { hash } = useParams<{ repo: string; branch: string; hash: string }>()
  if (!hash) throw new Error('Invalid commit params')
  return { repo, branch, hash, path }
}
