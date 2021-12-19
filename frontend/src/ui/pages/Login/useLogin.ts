import { FormEvent, useState } from 'react'
import { login } from '../../../services/session'

export function useLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    login(username, password).then(() => {
      window.location.reload()
    })
  }

  return { username, setUsername, password, setPassword, onSubmit }
}
