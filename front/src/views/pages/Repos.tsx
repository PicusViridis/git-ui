import { useFetch } from '@saramorillon/hooks'
import { format, parseISO } from 'date-fns'
import React from 'react'
import { Link } from 'react-router-dom'
import { useTitle } from '../../hooks/useTitle'
import { getRepositories } from '../../services/repository'
import { makeUrl } from '../../utils/utils'
import { Error, Loading, NotFound } from '../components/Helpers'

export function Repos(): JSX.Element {
  useTitle('Repositories')
  const [repositories, { loading, error }] = useFetch(getRepositories, [])

  if (loading) {
    return <Loading message="Loading repositories" />
  }

  if (error) {
    return <Error message="Error while loading repositories" />
  }

  if (!repositories.length) {
    return <NotFound message="No repository found" />
  }

  return (
    <>
      {repositories.map((repo) => (
        <div key={repo.name} className="mt2">
          <h4>
            <Link to={makeUrl(repo.name, 'master', 'tree')}>{repo.name}</Link>
          </h4>
          <p>Updated {format(parseISO(repo.updatedAt), 'PP')}</p>
          <hr />
        </div>
      ))}
    </>
  )
}
