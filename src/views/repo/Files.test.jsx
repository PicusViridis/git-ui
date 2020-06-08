import { render } from '@testing-library/react'
import React from 'react'
import Files from './Files'

describe('Files', () => {
    it('Should render each file', () => {
        const repo = { branches: [], breadcrumb: [] }
        const files = [
            { name: 'file', lastCommit: { message: 'commit1', date: 'some date1' }, path: 'file' },
            { name: 'folder', lastCommit: { message: 'commit2', date: 'some date2' }, path: 'folder' },
        ]
        const { queryByText } = render(<Files repo={repo} files={files} />)
        expect(queryByText('file')).not.toBeNull()
        expect(queryByText('commit1')).not.toBeNull()
        expect(queryByText('some date1')).not.toBeNull()
        expect(queryByText('folder')).not.toBeNull()
        expect(queryByText('commit2')).not.toBeNull()
        expect(queryByText('some date2')).not.toBeNull()
    })

    it('Should render file link correctly', () => {
        const repo = { name: 'name', branch: 'branch', branches: [], breadcrumb: [] }
        const files = [
            { name: 'file', type: 'file', lastCommit: {}, path: 'file' },
            { name: 'folder', type: 'folder', lastCommit: {}, path: 'folder' },
        ]
        const { queryByText } = render(<Files repo={repo} files={files} />)
        expect(queryByText('file').href).toBe('http://localhost/repo/name/file/branch?path=file')
        expect(queryByText('folder').href).toBe('http://localhost/repo/name/files/branch?path=folder')
    })
})
