import { render } from '@testing-library/react'
import React from 'react'
import ListUsers from './ListUsers'

describe('ListUsers', () => {
    it('Should render each user', () => {
        const users = [{ username: 'user1' }, { username: 'user2' }]
        const { queryByText } = render(<ListUsers user={{}} users={users} />)
        expect(queryByText('user1')).not.toBeNull()
        expect(queryByText('user2')).not.toBeNull()
    })

    it('Should disabled delete if user is the same as session user', () => {
        const user = { username: 'user1' }
        const { queryByText } = render(<ListUsers user={user} users={[user]} />)
        expect(queryByText('Delete').parentElement.disabled).toBe(true)
    })

    it('Should enable delete if user is the same as session user', () => {
        const users = [{ username: 'user1' }]
        const { queryByText } = render(<ListUsers user={{}} users={users} />)
        expect(queryByText('Delete').parentElement.href).toBe('http://localhost/admin/delete-user/user1')
    })
})
