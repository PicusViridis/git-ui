import { Button, Card, H4 } from '@blueprintjs/core'
import { format, parseISO } from 'date-fns'
import React from 'react'
import { IUser } from '../../../../../models/User'
import { useTitle } from '../../../hooks/useTitle'
import { useDeleteUser } from './useDeleteUser'

export interface IUserProps {
  user: IUser
  refresh: () => void
}

export function User({ user, refresh }: IUserProps): JSX.Element {
  useTitle('Users')
  const { canDelete, loading, onDelete } = useDeleteUser(user, refresh)

  return (
    <Card key={user.username} className="mb2">
      <Button
        disabled={!canDelete}
        onClick={onDelete}
        loading={loading}
        intent="danger"
        icon="delete"
        className="right"
      >
        Delete
      </Button>
      <H4>{user.username}</H4>
      <small title={user.createdAt}>Created at {format(parseISO(user.createdAt), 'Pp')}</small>
    </Card>
  )
}
