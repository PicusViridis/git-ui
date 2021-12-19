import { useFetch } from '@saramorillon/hooks'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Page } from '../../../../../models/Pages'
import { getBranches } from '../../../services/branch'
import { makeUrl } from '../../../utils/utils'

export function useBranches(repo: string, page: Page, path?: string) {
  const fetch = useCallback(() => getBranches(repo), [repo])
  const [branches, { loading }] = useFetch(fetch, [])
  const navigate = useNavigate()

  const onChange = useCallback(
    (branch: string) => {
      navigate(makeUrl(repo, branch, page, path))
    },
    [navigate, repo, page, path]
  )

  return { loading, branches, onChange }
}
