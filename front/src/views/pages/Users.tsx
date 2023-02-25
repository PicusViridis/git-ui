import { useFetch } from '@saramorillon/hooks'
import { IconPlus, IconTrash } from '@tabler/icons'
import { format, parseISO } from 'date-fns'
import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useSession } from '../../contexts/SessionContext'
import { useTitle } from '../../hooks/useTitle'
import { IUser } from '../../models/User'
import { deleteUser, getUsers } from '../../services/user'
import { LoadContainer } from '../components/LoadContainer'

export function Users(): JSX.Element {
  useTitle('Users')

  const [users, { loading }, refresh] = useFetch(getUsers, [])

  const session = useSession()

  const onDelete = useCallback((user: IUser) => deleteUser(user).then(refresh), [refresh])

  return (
    <>
      <div className="mb2 clearfix">
        <Link className="right" to="/user">
          <IconPlus /> Create user
        </Link>
      </div>

      <LoadContainer loading={loading}>
        {users.map((user) => (
          <article key={user.username} className="mb2">
            {user.username !== session.username && (
              <button aria-busy={loading} disabled={loading} onClick={() => onDelete(user)} className="right">
                {!loading && <IconTrash />} Delete
              </button>
            )}
            <h4>{user.username}</h4>
            <p>
              <small title={user.createdAt}>Created at {format(parseISO(user.createdAt), 'Pp')}</small>
            </p>
          </article>
        ))}
      </LoadContainer>
    </>
  )
}
