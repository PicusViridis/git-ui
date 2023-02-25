import { render, screen } from '@testing-library/react'
import React from 'react'
import { useRepoParams } from '../../../../src/hooks/useParams'
import { getServerUrl } from '../../../../src/services/server'
import { getTree } from '../../../../src/services/tree'
import { Tree } from '../../../../src/views/pages/Tree'
import { mockFile, mockFileMeta, wait } from '../../../mocks'

jest.mock('../../../../src/hooks/useParams')
jest.mock('../../../../src/services/tree')
jest.mock('../../../../src/services/server')

describe('Tree', () => {
  beforeEach(() => {
    jest.mocked(useRepoParams).mockReturnValue({ repo: 'repo', branch: 'branch', path: 'path' })
    jest.mocked(getServerUrl).mockResolvedValue('serverUrl')
    jest.mocked(getTree).mockResolvedValue([])
  })

  it('should get tree', async () => {
    render(<Tree />)
    await wait()
    expect(getTree).toHaveBeenCalledWith('repo', 'branch', 'path')
  })

  it('should render loader when loading', async () => {
    render(<Tree />)
    expect(screen.getByLabelText('Loading...')).toBeInTheDocument()
    await wait()
  })

  it('should render not found when tree is not found', async () => {
    jest.mocked(getTree).mockResolvedValue(null as never)
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
    jest.mocked(getTree).mockResolvedValue([mockFileMeta()])
    render(<Tree />)
    await wait()
    expect(screen.getByText('name1')).toBeInTheDocument()
  })

  it('should render file when tree is a file', async () => {
    jest.mocked(getTree).mockResolvedValue(mockFile())
    render(<Tree />)
    await wait()
    expect(screen.getByText('content')).toBeInTheDocument()
  })
})
