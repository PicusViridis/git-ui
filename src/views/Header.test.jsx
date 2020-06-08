import { render } from '@testing-library/react'
import React from 'react'
import Header from './Header'

describe('Header', () => {
    it('Should show the header button if user is present', () => {
        const { queryByText } = render(<Header user />)
        expect(queryByText('Admin')).not.toBeNull()
        expect(queryByText('Log out')).not.toBeNull()
    })

    it('Should not show the header if user is missing', () => {
        const { queryByText } = render(<Header />)
        expect(queryByText('Admin')).toBeNull()
        expect(queryByText('Log out')).toBeNull()
    })
})
