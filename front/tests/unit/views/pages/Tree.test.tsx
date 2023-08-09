import { render, screen } from '@testing-library/react'
import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useRepoParams } from '../../../../src/hooks/useParams'
import { getServerUrl } from '../../../../src/services/server'
import { getTree } from '../../../../src/services/tree'
import { Tree } from '../../../../src/views/pages/Tree'
import { mockFile, mockFileMeta, wait } from '../../../mocks'

vi.mock('../../../../src/hooks/useParams')
vi.mock('../../../../src/services/tree')
vi.mock('../../../../src/services/server')

describe('Tree', () => {
  beforeEach(() => {
    vi.mocked(useRepoParams).mockReturnValue({ repo: 'repo', branch: 'branch', path: 'path' })
    vi.mocked(getServerUrl).mockResolvedValue('serverUrl')
    vi.mocked(getTree).mockResolvedValue([])
  })

  it('should get tree', async () => {
    render(<Tree />)
    await wait()
    expect(getTree).toHaveBeenCalledWith('repo', 'branch', 'path')
  })

  it('should render loader when loading', async () => {
    render(<Tree />)
    expect(screen.getByText('Loading repository')).toBeInTheDocument()
    await wait()
  })

  it('should render error on fetch error', async () => {
    vi.mocked(getTree).mockRejectedValue('Error')
    render(<Tree />)
    await wait()
    expect(screen.getByText('Error while loading repository')).toBeInTheDocument()
  })

  it('should render not found when commit is not found', async () => {
    vi.mocked(getTree).mockResolvedValue(null)
    render(<Tree />)
    await wait()
    expect(screen.getByText('Repository not found')).toBeInTheDocument()
  })

  it('should render empty when tree is empty', async () => {
    render(<Tree />)
    await wait()
    expect(screen.getByText('Clone this repository')).toBeInTheDocument()
  })

  it('should render files when tree is not empty', async () => {
    vi.mocked(getTree).mockResolvedValue([mockFileMeta()])
    render(<Tree />)
    await wait()
    expect(screen.getByText('name1')).toBeInTheDocument()
  })

  it('should render file when tree is a file', async () => {
    vi.mocked(getTree).mockResolvedValue(mockFile())
    render(<Tree />)
    await wait()
    expect(screen.getByText('content')).toBeInTheDocument()
  })
})
