import { useFetch } from '@saramorillon/hooks'
import React, { useCallback } from 'react'
import { useRepoParams } from '../../hooks/useParams'
import { getTree } from '../../services/tree'
import { Error, Loading, NotFound } from '../components/Helpers'
import { Empty } from './Empty'
import { File } from './File'
import { Files } from './Files'

export function Tree(): JSX.Element {
  const { repo, branch, path } = useRepoParams()
  const fetch = useCallback(() => getTree(repo, branch, path), [repo, branch, path])
  const [tree, { loading, error }] = useFetch(fetch, [])

  if (loading) {
    return <Loading message="Loading repository" />
  }

  if (error) {
    return <Error message="Error while loading repository" />
  }

  if (!tree) {
    return <NotFound message="Repository not found" />
  }

  if (Array.isArray(tree)) {
    if (!tree.length) {
      return <Empty repo={repo} />
    }
    return <Files files={tree} />
  }

  return <File file={tree} />
}
