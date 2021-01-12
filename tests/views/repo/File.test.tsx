import { render } from '@testing-library/react'
import React from 'react'
import File from '../../../src/views/repo/File'

describe('File', () => {
    it('Should render content as is', () => {
        const repo = { name: 'name', branches: [], breadcrumb: [] }
        const { queryByText } = render(<File repo={repo} content="<p>Coucou</p>" />)
        expect(queryByText('Coucou')).not.toBeNull()
    })

    it('Should render message if content is missing', () => {
        const repo = { name: 'name', branches: [], breadcrumb: [] }
        const { queryByText } = render(<File repo={repo} />)
        expect(queryByText('Cannot preview binary file.')).not.toBeNull()
    })

    it('Should render download link correctly', () => {
        const repo = { name: 'name', branch: 'branch', path: 'path', branches: [], breadcrumb: [] }
        const commits = [{ hash: 'hash', fullHash: 'full-hash', message: 'commit' }]
        const { queryByText } = render(<File repo={repo} commits={commits} />)
        expect(queryByText('Download file').parentElement.href).toBe(
            'http://localhost/repo/name/download/branch?path=path'
        )
    })
})
