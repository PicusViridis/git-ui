import { useCallback, useState } from 'react'
import { IUser } from '../../../../../models/User'
import { useSession } from '../../../contexts/SessionContext'
import { deleteUser } from '../../../services/user'

export function useDeleteUser(user: IUser, refresh: () => void) {
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

  return { loading, canDelete: user.username !== session.username, onDelete }
}
