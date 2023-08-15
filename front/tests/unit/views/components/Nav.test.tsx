import { render, screen } from '@testing-library/react'
import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useRepoParams } from '../../../../src/hooks/useParams'
import { Nav } from '../../../../src/views/components/Nav'
import { wait } from '../../../mocks'

vi.mock('../../../../src/hooks/useParams')

describe('Nav', () => {
  beforeEach(() => {
    vi.mocked(useRepoParams).mockReturnValue({ repo: 'repo', branch: 'branch', path: 'path' })
  })

  it('should render tabs', async () => {
    render(<Nav page="tree" />)
    await wait()
    expect(screen.getByText('Files')).toHaveAttribute('href', '/repo/repo/branch/tree?path=path')
    expect(screen.getByText('Commits')).toHaveAttribute('href', '/repo/repo/branch/commits?path=path')
  })

  it('should render active tab', async () => {
    render(<Nav page="tree" />)
    await wait()
    expect(screen.getByText('Files')).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Commits')).toHaveAttribute('aria-selected', 'false')
  })
})
