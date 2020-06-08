import { render } from '@testing-library/react'
import React from 'react'
import Layout from './Layout'

describe('Layout', () => {
    it('Should render children inside main section', () => {
        const { queryByText } = render(<Layout>I&apos;m a child!</Layout>)
        expect(queryByText("I'm a child!")).not.toBeNull()
    })
})
