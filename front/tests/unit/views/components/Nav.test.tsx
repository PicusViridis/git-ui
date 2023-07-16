import { render, screen } from '@testing-library/react'
import React from 'react'
import { usePage } from '../../../../src/hooks/usePage'
import { useRepoParams } from '../../../../src/hooks/useParams'
import { Nav } from '../../../../src/views/components/Nav'
import { wait } from '../../../mocks'

jest.mock('../../../../src/hooks/useParams')
jest.mock('../../../../src/hooks/usePage')

describe('Nav', () => {
  beforeEach(() => {
    jest.mocked(useRepoParams).mockReturnValue({ repo: 'repo', branch: 'branch', path: 'path' })
    jest.mocked(usePage).mockReturnValue('tree')
  })

  it('should render tabs', async () => {
    render(<Nav />)
    await wait()
    expect(screen.getByText('Files')).toHaveAttribute('href', '/repo/repo/branch/tree?path=path')
    expect(screen.getByText('Commits')).toHaveAttribute('href', '/repo/repo/branch/commits?path=path')
  })

  it('should render active tab', async () => {
    render(<Nav />)
    await wait()
    expect(screen.getByText('Files')).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Commits')).toHaveAttribute('aria-selected', 'false')
  })
})
