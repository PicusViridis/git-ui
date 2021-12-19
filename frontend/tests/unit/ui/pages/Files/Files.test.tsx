import { render, screen } from '@testing-library/react'
import mockdate from 'mockdate'
import React from 'react'
import { IFileMeta } from '../../../../../../models/File'
import { useRepoParams } from '../../../../../src/hooks/useParams'
import { Files } from '../../../../../src/ui/pages/Files/Files'
import { mock, mockFileMeta1, mockFileMeta2, routerWrapper } from '../../../../mocks'

jest.mock('../../../../../src/hooks/useParams')

mockdate.set('2020-02-01T00:00:00.000Z')

const files: IFileMeta[] = [mockFileMeta1, mockFileMeta2]

describe('Files', () => {
  beforeEach(() => {
    mock(useRepoParams).mockReturnValue({})
  })

  it('should render file name', () => {
    render(<Files files={files} />, { wrapper: routerWrapper })
    expect(screen.getByText('name1')).toBeInTheDocument()
    expect(screen.getByText('name2')).toBeInTheDocument()
  })

  it('should render last commit message', () => {
    render(<Files files={files} />, { wrapper: routerWrapper })
    expect(screen.getByText('message1')).toBeInTheDocument()
    expect(screen.getByText('message2')).toBeInTheDocument()
  })

  it('should render last commit date', () => {
    render(<Files files={files} />, { wrapper: routerWrapper })
    expect(screen.getByText('about 1 year ago')).toBeInTheDocument()
    expect(screen.getByText('about 1 month ago')).toBeInTheDocument()
  })

  it('should render link', () => {
    mock(useRepoParams).mockReturnValue({ repo: 'repo', branch: 'branch', path: 'path' })
    render(<Files files={files} />, { wrapper: routerWrapper })
    expect(screen.getAllByRole('link')[0]).toHaveAttribute('href', '/repo/repo/branch/tree?path=path1')
    expect(screen.getAllByRole('link')[1]).toHaveAttribute('href', '/repo/repo/branch/tree?path=path2')
  })

  it('should render icon', () => {
    render(<Files files={files} />, { wrapper: routerWrapper })
    expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', '/icons/icon1')
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('src', '/icons/icon2')
  })
})
