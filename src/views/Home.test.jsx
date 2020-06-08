import { render } from '@testing-library/react'
import React from 'react'
import Home from './Home'

describe('Home', () => {
    it('Should render each repository', () => {
        const repositories = [
            { name: 'repo1', lastCommit: { date: '1 day ago' } },
            { name: 'repo2', lastCommit: { date: '2 days ago' } },
        ]
        const { queryByText } = render(<Home repositories={repositories} />)
        expect(queryByText('repo1')).not.toBeNull()
        expect(queryByText('Updated 1 day ago')).not.toBeNull()
        expect(queryByText('repo2')).not.toBeNull()
        expect(queryByText('Updated 2 days ago')).not.toBeNull()
    })

    it('Should render repository link correctly', () => {
        const repositories = [{ name: 'repo1', lastCommit: { date: 'date' } }]
        const { container } = render(<Home repositories={repositories} />)
        expect(container.querySelector('a').href).toBe('http://localhost/repo/repo1/files')
    })
})
