import { H4 } from '@blueprintjs/core'
import React from 'react'
import { LoadContainer } from '../../components/LoadContainer/LoadContainer'
import { Diff } from './Diff'
import { useCommit } from './useCommit'

export function Commit(): JSX.Element {
  const { commit, loading, diffs } = useCommit()

  return (
    <LoadContainer loading={loading}>
      <H4>{commit?.message}</H4>
      {diffs.map((diff, key) => (
        <Diff key={key} diff={diff} />
      ))}
    </LoadContainer>
  )
}
