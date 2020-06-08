import { render } from '@testing-library/react'
import React from 'react'
import Diff from './Diff'

describe('Diff', () => {
    it('Should render HTML diff as is', () => {
        const { queryByText } = render(<Diff diff="<p>Coucou</p>" />)
        expect(queryByText('Coucou')).not.toBeNull()
    })
})
