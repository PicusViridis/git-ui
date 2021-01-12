import { render } from '@testing-library/react'
import React from 'react'
import Common from '../../../src/views/repo/Common'

describe('Common', () => {
    it('Should render repo name', () => {
        const repo = { name: 'name', branches: [] }
        const { queryByText } = render(<Common repo={repo} />)
        expect(queryByText('name')).not.toBeNull()
    })

    it('should render links correctly', () => {
        const repo = { name: 'name', branch: 'branch', branches: [] }
        const { queryByText } = render(<Common repo={repo} />)
        expect(queryByText('Files').href).toBe('http://localhost/repo/name/files/branch')
        expect(queryByText('Commits').href).toBe('http://localhost/repo/name/commits/branch')
    })

    it('Should set "Files" tab active when active is "files"', () => {
        const repo = { name: 'repoName', branches: [] }
        const { queryByText } = render(<Common repo={repo} active="files" />)
        expect(queryByText('Files').parentElement.classList).toContain('is-active')
        expect(queryByText('Commits').parentElement.classList).not.toContain('is-active')
    })

    it('Should set "Commits" tab active when active is "commits"', () => {
        const repo = { name: 'repoName', branches: [] }
        const { queryByText } = render(<Common repo={repo} active="commits" />)
        expect(queryByText('Commits').parentElement.classList).toContain('is-active')
        expect(queryByText('Files').parentElement.classList).not.toContain('is-active')
    })
})
