import { useFetch } from '@saramorillon/hooks'
import { IconTrash } from '@tabler/icons'
import { format, parseISO } from 'date-fns'
import React, { Fragment, useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import { useRepoParams } from '../../hooks/useParams'
import { deleteBranch, getBranches } from '../../services/branch'
import { makeUrl } from '../../utils/utils'
import { Error, Loading, NotFound } from '../components/Helpers'

export function Branches(): JSX.Element {
  const { repo, path } = useRepoParams()
  const fetch = useCallback(() => getBranches(repo), [repo])
  const [branches, { loading, error }, refresh] = useFetch(fetch, [])

  const onDeleteBranch = useCallback(
    (name: string) => {
      void deleteBranch(repo, name).then(refresh)
    },
    [repo, refresh]
  )

  if (loading) {
    return <Loading message="Loading branches" />
  }

  if (error) {
    return <Error message="Error while loading branches" />
  }

  if (!branches.length) {
    return <NotFound message="No branch found" />
  }

  return (
    <>
      {branches.map((branch) => (
        <Fragment key={branch.name}>
          <div className="flex justify-between items-center py1">
            <div>
              <NavLink to={makeUrl(repo, branch.name, 'tree', path)}>{branch.name}</NavLink>
              <br />
              <small>Updated on {format(parseISO(branch.lastCommit.date), 'PP')}</small>
            </div>
            <button aria-label={`Delete branch "${branch.name}"`} onClick={() => onDeleteBranch(branch.name)}>
              <IconTrash />
            </button>
          </div>
          <hr />
        </Fragment>
      ))}
    </>
  )
}
