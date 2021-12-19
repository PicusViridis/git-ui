import { Divider, H4 } from '@blueprintjs/core'
import { useFetch } from '@saramorillon/hooks'
import { format, parseISO } from 'date-fns'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useTitle } from '../../../hooks/useTitle'
import { getRepositories } from '../../../services/repository'
import { makeUrl } from '../../../utils/utils'
import { LoadContainer } from '../../components/LoadContainer/LoadContainer'

export function Repos(): JSX.Element {
  useTitle('Repositories')
  const [repositories, { loading }] = useFetch(getRepositories, [])

  return (
    <LoadContainer loading={loading}>
      {repositories.map((repo) => (
        <div key={repo.name} className="mt2">
          <H4>
            <NavLink to={makeUrl(repo.name, 'master', 'tree')}>{repo.name}</NavLink>
          </H4>
          <p>Updated {format(parseISO(repo.updatedAt), 'PP')}</p>
          <Divider />
        </div>
      ))}
    </LoadContainer>
  )
}
