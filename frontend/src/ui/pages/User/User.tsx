import { Button, FormGroup, InputGroup } from '@blueprintjs/core'
import React from 'react'
import { useUser } from './useUser'

export function User(): JSX.Element {
  const { loading, username, setUsername, password, setPassword, onSubmit } = useUser()

  return (
    <form onSubmit={onSubmit}>
      <FormGroup label="Username" labelFor="username" labelInfo="*">
        <InputGroup id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </FormGroup>

      <FormGroup label="Password" labelFor="password" labelInfo="*">
        <InputGroup
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </FormGroup>

      <Button icon="floppy-disk" type="submit" loading={loading}>
        Save
      </Button>
    </form>
  )
}
