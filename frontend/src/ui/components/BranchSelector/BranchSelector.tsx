import { HTMLSelect } from '@blueprintjs/core'
import React from 'react'
import { Page } from '../../../../../models/Pages'
import { IRepoParams } from '../../../hooks/useParams'
import { LoadContainer } from '../LoadContainer/LoadContainer'
import { useBranches } from './useBranches'

export interface IBranchSelectorProps extends IRepoParams {
  page: Page
}

export function BranchSelector({ repo, branch, page, path }: IBranchSelectorProps): JSX.Element {
  const { loading, branches, onChange } = useBranches(repo, page, path)

  return (
    <LoadContainer loading={loading} size={16} className="mx3">
      <HTMLSelect value={branch} onChange={(e) => onChange(e.target.value)} disabled={branch.length < 2} minimal large>
        {branches.map((branch) => (
          <option key={branch} value={branch}>
            {branch}
          </option>
        ))}
      </HTMLSelect>
    </LoadContainer>
  )
}
