import React from 'react'
import { LoadContainer } from '../../components/LoadContainer/LoadContainer'
import { Empty } from '../Empty/Empty'
import { File } from '../File/File'
import { Files } from '../Files/Files'
import { useTree } from './useTree'

export function Tree(): JSX.Element {
  const { tree, loading, repo } = useTree()

  return (
    <LoadContainer loading={loading}>
      {!tree ? <Empty repo={repo} /> : Array.isArray(tree) ? <Files files={tree} /> : <File file={tree} />}
    </LoadContainer>
  )
}
