import { Button } from '@blueprintjs/core'
import { useFetch } from '@saramorillon/hooks'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getUsers } from '../../../services/user'
import { LoadContainer } from '../../components/LoadContainer/LoadContainer'
import { User } from './User'

export function Users(): JSX.Element {
  const [users, { loading }, refresh] = useFetch(getUsers, [])
  const navigate = useNavigate()

  return (
    <>
      <Button icon="plus" className="mb2 right" onClick={() => navigate('/user')}>
        Create user
      </Button>
      <div className="clearfix" />
      <LoadContainer loading={loading}>
        {users.map((user) => (
          <User key={user.username} user={user} refresh={refresh} />
        ))}
      </LoadContainer>
    </>
  )
}
