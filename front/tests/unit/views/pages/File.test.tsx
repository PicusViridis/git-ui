import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { useRepoParams } from '../../../../src/hooks/useParams'
import { File } from '../../../../src/views/pages/File'
import { mockFile, mockLocation, restoreLocation } from '../../../mocks'

jest.mock('../../../../src/hooks/useParams')

describe('File', () => {
  beforeEach(() => {
    jest.mocked(useRepoParams).mockReturnValue({ repo: 'repo', branch: 'branch', path: 'path' })
  })

  it('should render file size as bytes', () => {
    render(<File file={mockFile()} />)
    expect(screen.getByText('1000 kiB')).toBeInTheDocument()
  })

  it('should render download link', () => {
    mockLocation({ assign: jest.fn() })
    render(<File file={mockFile()} />)
    fireEvent.click(screen.getByRole('button'))
    expect(window.location.assign).toHaveBeenCalledWith('/api/repo/repo/branch/download?path=path')
    restoreLocation()
  })

  it('should render file content', () => {
    render(<File file={mockFile()} />)
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('should render binary warning if content is empty', () => {
    render(<File file={mockFile({ content: '' })} />)
    expect(screen.getByText('Cannot preview binary file')).toBeInTheDocument()
  })
})
