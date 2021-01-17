import { format } from 'date-fns'
import React from 'react'
import { Button, Card, CardBody, CardSubtitle, CardTitle } from 'reactstrap'
import { User } from '../../models/User'

interface IUserCardProps {
  user: User
  canDelete: boolean
}

function UserCard({ user, canDelete }: IUserCardProps): JSX.Element {
  const href = canDelete ? `/users/delete-user/${user.username}` : undefined

  return (
    <Card className="mb-4">
      <CardBody className="flex ">
        <Button as="a" href={href} disabled={!canDelete} outline={!canDelete} color="danger" className="float-right">
          <i className="fas fa-trash"></i> Delete
        </Button>
        <CardTitle tag="h5">{user.username}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          Created at {format(user.createdAt, 'PPP')}
        </CardSubtitle>
      </CardBody>
    </Card>
  )
}

interface IListUsersProps {
  users: User[]
  user: User
}

export default function ListUsers({ users, user }: IListUsersProps): JSX.Element {
  const { username } = user
  return (
    <>
      <a href="/users/add" className="text-right d-block">
        <i className="fas fa-plus"></i> Create User
      </a>
      <hr />
      {users.map((user) => (
        <UserCard key={user.id} user={user} canDelete={user.username === username} />
      ))}
    </>
  )
}
