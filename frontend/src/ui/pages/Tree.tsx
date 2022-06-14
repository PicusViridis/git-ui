import { useFetch } from '@saramorillon/hooks'
import React, { useCallback } from 'react'
import { useRepoParams } from '../../hooks/useParams'
import { getTree } from '../../services/tree'
import { Loader, NotFound } from '../components/Helpers'
import { Empty } from './Empty'
import { File } from './File'
import { Files } from './Files'

export function Tree(): JSX.Element {
  const { repo, branch, path } = useRepoParams()
  const fetch = useCallback(() => getTree(repo, branch, path), [repo, branch, path])
  const [tree, { loading }] = useFetch(fetch, [])

  if (loading) {
    return <Loader />
  }

  if (!tree) {
    return <NotFound />
  }

  if (Array.isArray(tree)) {
    if (!tree.length) {
      return <Empty repo={repo} />
    }
    return <Files files={tree} />
  }

  return <File file={tree} />
}
