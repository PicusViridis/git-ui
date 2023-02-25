import { render, screen } from '@testing-library/react'
import React from 'react'
import { useRepoParams } from '../../../../src/hooks/useParams'
import { getServerUrl } from '../../../../src/services/server'
import { getTree } from '../../../../src/services/tree'
import { Tree } from '../../../../src/views/pages/Tree'
import { flushPromises, mock, mockFile1, mockFileMeta1, renderAsync, routerWrapper } from '../../../mocks'

jest.mock('../../../../src/hooks/useParams')
jest.mock('../../../../src/services/tree')
jest.mock('../../../../src/services/server')

describe('Tree', () => {
  beforeEach(() => {
    mock(useRepoParams).mockReturnValue({ repo: 'repo', branch: 'branch', path: 'path' })
    mock(getServerUrl).mockResolvedValue('serverUrl')
    mock(getTree).mockResolvedValue([])
  })

  it('should get tree', async () => {
    await renderAsync(<Tree />, { wrapper: routerWrapper })
    expect(getTree).toHaveBeenCalledWith('repo', 'branch', 'path')
  })

  it('should render loader when loading', async () => {
    render(<Tree />, { wrapper: routerWrapper })
    expect(screen.getByLabelText('Loading...')).toBeInTheDocument()
    await flushPromises()
  })

  it('should render not found when tree is not found', async () => {
    mock(getTree).mockResolvedValue(null)
    await renderAsync(<Tree />, { wrapper: routerWrapper })
    expect(screen.getByText('Not found')).toBeInTheDocument()
  })

  it('should render empty when tree is empty', async () => {
    await renderAsync(<Tree />, { wrapper: routerWrapper })
    expect(screen.getByText('Clone this repository')).toBeInTheDocument()
  })

  it('should render files when tree is not empty', async () => {
    mock(getTree).mockResolvedValue([mockFileMeta1])
    await renderAsync(<Tree />, { wrapper: routerWrapper })
    expect(screen.getByText('name1')).toBeInTheDocument()
  })

  it('should render file when tree is a file', async () => {
    mock(getTree).mockResolvedValue(mockFile1)
    await renderAsync(<Tree />, { wrapper: routerWrapper })
    expect(screen.getByText('content')).toBeInTheDocument()
  })
})
