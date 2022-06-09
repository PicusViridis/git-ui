import { useFetch } from '@saramorillon/hooks'
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Page } from '../../../../models/Pages'
import { IRepoParams } from '../../hooks/useParams'
import { getBranches } from '../../services/branch'
import { makeUrl } from '../../utils/utils'

export interface IBranchSelectorProps extends IRepoParams {
  page: Page
}

export function BranchSelector({ repo, branch, page, path }: IBranchSelectorProps): JSX.Element {
  const fetch = useCallback(() => getBranches(repo), [repo])
  const [branches, { loading }] = useFetch(fetch, [])
  const navigate = useNavigate()

  const onChange = useCallback(
    (branch: string) => {
      navigate(makeUrl(repo, branch, page, path))
    },
    [navigate, repo, page, path]
  )

  return (
    <label aria-busy={loading && !branches.length}>
      <select
        value={branch}
        onChange={(e) => onChange(e.target.value)}
        disabled={(loading && !branches.length) || branches.length < 2}
        className="p1 mt1"
      >
        {branches.map((branch) => (
          <option key={branch} value={branch}>
            {branch}
          </option>
        ))}
      </select>
    </label>
  )
}
