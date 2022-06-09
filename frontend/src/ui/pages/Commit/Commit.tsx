import React from 'react'
import { LoadContainer } from '../../components/LoadContainer'
import { Diff } from './Diff'
import { useCommit } from './useCommit'

export function Commit(): JSX.Element {
  const { commit, loading, diffs } = useCommit()

  return (
    <LoadContainer loading={loading}>
      <h4>{commit?.message}</h4>
      {diffs.map((diff, key) => (
        <Diff key={key} diff={diff} />
      ))}
    </LoadContainer>
  )
}
