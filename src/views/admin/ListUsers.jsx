import React from 'react'

function UserDelete({ user, canDelete, children }) {
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

function User({ user, canDelete }) {
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

export default function ListUsers({ users, user }) {
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
                <User key={_user.username} user={_user} canDelete={_user.username !== user.username} />
            ))}
        </>
    )
}
