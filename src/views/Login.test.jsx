import { render } from '@testing-library/react'
import React from 'react'
import Login from './Login'

describe('Login', () => {
    it('should render error if present', () => {
        const { queryByText } = render(<Login error="Oh, an error ='(" />)
        expect(queryByText("Oh, an error ='(")).not.toBeNull()
    })
})
