import React from 'react'
import { Input } from 'reactstrap'
import { IRepositoryMeta } from '../../models/interfaces'

interface IBranchSelectProps {
  repo: IRepositoryMeta
  active: string
}

export default function BranchSelect({ repo, active }: IBranchSelectProps): JSX.Element {
  const disabled = repo.branches.length === 1
  return (
    <Input type="select" defaultValue={active} disabled={disabled} style={{ width: 'unset' }} className="ml-3">
      {repo.branches.map((branch) => (
        <option key={branch} value={branch}>
          {branch}
        </option>
      ))}
    </Input>
  )
}
