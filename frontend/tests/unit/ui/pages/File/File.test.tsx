import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { useRepoParams } from '../../../../../src/hooks/useParams'
import { File } from '../../../../../src/ui/pages/File/File'
import { mock, mockFile1, mockFile2, mockLocation, restoreLocation, routerWrapper } from '../../../../mocks'

jest.mock('../../../../../src/hooks/useParams')

describe('File', () => {
  beforeEach(() => {
    mock(useRepoParams).mockReturnValue({})
  })

  it('should render file size as bytes', () => {
    render(<File file={mockFile1} />, { wrapper: routerWrapper })
    expect(screen.getByText('1000 kiB')).toBeInTheDocument()
  })

  it('should render download link', () => {
    mockLocation({ assign: jest.fn() })
    mock(useRepoParams).mockReturnValue({ repo: 'repo', branch: 'branch', path: 'path' })
    render(<File file={mockFile1} />, { wrapper: routerWrapper })
    fireEvent.click(screen.getByRole('button'))
    expect(window.location.assign).toHaveBeenCalledWith('/api/repo/repo/branch/download?path=path')
    restoreLocation()
  })

  it('should render file content', () => {
    render(<File file={mockFile1} />, { wrapper: routerWrapper })
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('should binary warning if content is empty', () => {
    render(<File file={mockFile2} />, { wrapper: routerWrapper })
    expect(screen.getByText('Cannot preview binary file')).toBeInTheDocument()
  })
})
