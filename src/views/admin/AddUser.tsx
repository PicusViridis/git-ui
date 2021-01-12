import React from 'react'

export default function AddUser(): JSX.Element {
  return (
    <form action="/admin/add-user" method="POST">
      <div className="field">
        <label className="label" htmlFor="username">
          Username
        </label>
        <div className="control">
          <input id="username" className="input" name="username" type="text" />
        </div>
      </div>
      <div className="field">
        <label className="label" htmlFor="password">
          Password
        </label>
        <div className="control">
          <input id="password" className="input" name="password" type="password" />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button className="button is-primary">Create user</button>
        </div>
      </div>
    </form>
  )
}
