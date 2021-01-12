import { render } from '@testing-library/react'
import React from 'react'
import Breadcrumb from '../../../src/views/repo/Breadcrumb'

describe('Breadcrumb', () => {
    it('Should render each breadcrumb part', () => {
        const repo = {
            breadcrumb: [
                { name: 'root', isActive: false },
                { name: 'part1', path: 'part1', isActive: false },
                { name: 'part2', path: 'part1/part2', isActive: true },
            ],
        }
        const { queryByText, container } = render(<Breadcrumb repo={repo} />)
        expect(container.querySelectorAll('li')).toHaveLength(3)
        expect(queryByText('root')).not.toBeNull()
        expect(queryByText('part1')).not.toBeNull()
        expect(queryByText('part2')).not.toBeNull()
    })

    it('Should render each breadcrumb link correctly', () => {
        const repo = {
            name: 'repo',
            branch: 'branch',
            breadcrumb: [
                { name: 'root', isActive: false },
                { name: 'part1', path: 'part1', isActive: false },
                { name: 'part2', path: 'part1/part2', isActive: true },
            ],
        }
        const { queryByText } = render(<Breadcrumb repo={repo} />)
        expect(queryByText('root').href).toBe('http://localhost/repo/repo/files/branch')
        expect(queryByText('part1').href).toBe('http://localhost/repo/repo/files/branch?path=part1')
        expect(queryByText('part2').href).toBe('http://localhost/repo/repo/files/branch?path=part1/part2')
    })
})
