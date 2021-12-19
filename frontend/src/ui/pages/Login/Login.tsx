import { Button, Card, FormGroup, InputGroup } from '@blueprintjs/core'
import React from 'react'
import { useLogin } from './useLogin'

export function Login(): JSX.Element {
  const { username, setUsername, password, setPassword, onSubmit } = useLogin()

  return (
    <Card className="max-width-2 mx-auto my4">
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

        <Button icon="log-in" type="submit">
          Log in
        </Button>
      </form>
    </Card>
  )
}
