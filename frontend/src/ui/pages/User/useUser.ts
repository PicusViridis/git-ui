import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postUser } from '../../../services/user'

export function useUser() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    postUser(username, password).then(() => {
      navigate('/users')
    })
  }

  return { loading, username, setUsername, password, setPassword, onSubmit }
}
