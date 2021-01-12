import { render } from '@testing-library/react'
import React from 'react'
import Commits from '../../../src/views/repo/Commits'

describe('Commits', () => {
    it('Should render each commit', () => {
        const repo = { name: 'name', branches: [] }
        const commits = [
            { hash: 'hash1', message: 'commit1', date: 'some date1', author: 'author1' },
            { hash: 'hash2', message: 'commit2', date: 'some date2', author: 'author2' },
        ]
        const { queryByText } = render(<Commits repo={repo} commits={commits} />)
        expect(queryByText('commit1')).not.toBeNull()
        expect(queryByText('Commited some date1 by')).not.toBeNull()
        expect(queryByText('author1')).not.toBeNull()
        expect(queryByText('commit2')).not.toBeNull()
        expect(queryByText('Commited some date2 by')).not.toBeNull()
        expect(queryByText('author2')).not.toBeNull()
    })

    it('Should render commit message link correctly', () => {
        const repo = { name: 'name', branches: [] }
        const commits = [{ hash: 'hash', fullHash: 'full-hash', message: 'commit' }]
        const { queryByText } = render(<Commits repo={repo} commits={commits} />)
        expect(queryByText('commit').parentElement.href).toBe('http://localhost/repo/name/commit/full-hash')
    })

    it('Should render commit hash link correctly', () => {
        const repo = { name: 'name', branches: [] }
        const commits = [{ hash: 'hash', fullHash: 'full-hash', message: 'commit' }]
        const { queryByText } = render(<Commits repo={repo} commits={commits} />)
        expect(queryByText('hash').parentElement.href).toBe('http://localhost/repo/name/commit/full-hash')
    })
})
