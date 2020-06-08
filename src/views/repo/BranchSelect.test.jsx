import { render } from '@testing-library/react'
import React from 'react'
import BranchSelect from './BranchSelect'

describe('BranchSelect', () => {
    it('Should show a disabled button if there is no branch', () => {
        const repo = { branch: 'active branch', branches: [] }
        const { queryByText, container } = render(<BranchSelect repo={repo} />)
        expect(queryByText('active branch')).not.toBeNull()
        expect(container.querySelector('button[disabled]')).not.toBeNull()
    })

    it('Should show a dropdown if there are branches', () => {
        const repo = { branch: 'active branch', branches: ['another branch'] }
        const { queryByText, container } = render(<BranchSelect repo={repo} />)
        expect(queryByText('another branch')).not.toBeNull()
        expect(container.querySelector('button[disabled]')).toBeNull()
        expect(container.querySelector('.dropdown')).not.toBeNull()
    })

    it('Should render branches link correctly', () => {
        const repo = { name: 'repo', path: 'path', branch: 'active branch', branches: ['another branch'] }
        const { queryByText, container } = render(<BranchSelect repo={repo} active="active" />)
        expect(queryByText('another branch').href).toBe('http://localhost/repo/repo/active/another%20branch?path=path')
        expect(container.querySelector('button[disabled]')).toBeNull()
        expect(container.querySelector('.dropdown')).not.toBeNull()
    })
})
