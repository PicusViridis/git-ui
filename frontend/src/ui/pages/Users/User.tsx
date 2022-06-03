import { IconTrash } from '@tabler/icons'
import { format, parseISO } from 'date-fns'
import React, { useCallback, useState } from 'react'
import { IUser } from '../../../../../models/User'
import { useSession } from '../../../contexts/SessionContext'
import { useTitle } from '../../../hooks/useTitle'
import { deleteUser } from '../../../services/user'

export interface IUserProps {
  user: IUser
  refresh: () => void
}

export function User({ user, refresh }: IUserProps): JSX.Element {
  useTitle('Users')

  const session = useSession()
  const [loading, setLoading] = useState(false)

  const onDelete = useCallback(() => {
    setLoading(true)
    deleteUser(user)
      .then(() => {
        refresh()
      })
      .finally(() => {
        setLoading(false)
      })
  }, [user, refresh])

  return (
    <article className="mb2">
      {user.username !== session.username && (
        <button aria-busy={loading} disabled={loading} onClick={onDelete} className="right">
          {!loading && <IconTrash />} Delete
        </button>
      )}
      <h4>{user.username}</h4>
      <p>
        <small title={user.createdAt}>Created at {format(parseISO(user.createdAt), 'Pp')}</small>
      </p>
    </article>
  )
}
