import { useFetch } from '@saramorillon/hooks'
import { IconPlus, IconTrash } from '@tabler/icons'
import { format, parseISO } from 'date-fns'
import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useSession } from '../../contexts/SessionContext'
import { useTitle } from '../../hooks/useTitle'
import { IUser } from '../../models/User'
import { deleteUser, getUsers } from '../../services/user'
import { Error, Loading, NotFound } from '../components/Helpers'

export function Users(): JSX.Element {
  useTitle('Users')

  return (
    <>
      <div className="mb2 clearfix">
        <Link className="right" to="/user">
          <IconPlus /> Create user
        </Link>
      </div>
      <UsersList />
    </>
  )
}

function UsersList() {
  const [users, { loading, error }, refresh] = useFetch(getUsers, [])

  const session = useSession()

  const onDelete = useCallback((user: IUser) => deleteUser(user).then(refresh), [refresh])

  if (loading) {
    return <Loading message="Loading users" />
  }

  if (error) {
    return <Error message="Error while loading users" />
  }

  if (!users.length) {
    return <NotFound message="No user found" />
  }

  return (
    <>
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
    </>
  )
}
