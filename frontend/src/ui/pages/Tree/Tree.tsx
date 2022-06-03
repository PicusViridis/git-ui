import { useFetch } from '@saramorillon/hooks'
import React, { useCallback } from 'react'
import { useRepoParams } from '../../../hooks/useParams'
import { getTree } from '../../../services/tree'
import { LoadContainer } from '../../components/LoadContainer/LoadContainer'
import { Empty } from '../Empty/Empty'
import { File } from '../File/File'
import { Files } from '../Files/Files'

export function Tree(): JSX.Element {
  const { repo, branch, path } = useRepoParams()
  const fetch = useCallback(() => getTree(repo, branch, path), [repo, branch, path])
  const [tree, { loading }] = useFetch(fetch, [])

  const isTreeEmpty = !tree || (Array.isArray(tree) && !tree.length)

  return (
    <LoadContainer loading={loading}>
      {isTreeEmpty ? <Empty repo={repo} /> : Array.isArray(tree) ? <Files files={tree} /> : <File file={tree} />}
    </LoadContainer>
  )
}
