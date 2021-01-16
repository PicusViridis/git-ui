import React, { ReactNode } from 'react'
import { User } from '../../models/User'

interface IUserDeleteProps {
  user: User
  canDelete: boolean
  children: ReactNode
}

function UserDelete({ user, canDelete, children }: IUserDeleteProps): JSX.Element {
  const className = 'button is-danger'
  if (!canDelete) {
    return (
      <button disabled className={className}>
        {children}
      </button>
    )
  }

  return (
    <a href={`/admin/delete-user/${user.username}`} className={className}>
      {children}
    </a>
  )
}

interface IUserCardProps {
  user: User
  canDelete: boolean
}

function UserCard({ user, canDelete }: IUserCardProps): JSX.Element {
  return (
    <div className="box">
      <div className="level">
        <div className="level-left">
          <div className="level-item">{user.username}</div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <UserDelete user={user} canDelete={canDelete}>
              <span className="icon is-small">
                <i className="fas fa-trash"></i>
              </span>
              <span>Delete</span>
            </UserDelete>
          </div>
        </div>
      </div>
    </div>
  )
}

interface IListUsersProps {
  users: User[]
  user: User
}

export default function ListUsers({ users, user }: IListUsersProps): JSX.Element {
  return (
    <>
      <a href="/admin/add-user" className="button is-primary is-outlined">
        <span className="icon is-small">
          <i className="fas fa-plus"></i>
        </span>
        <span>Add</span>
      </a>
      <hr />
      {users.map((_user) => (
        <UserCard key={_user.username} user={_user} canDelete={_user.username !== user.username} />
      ))}
    </>
  )
}
