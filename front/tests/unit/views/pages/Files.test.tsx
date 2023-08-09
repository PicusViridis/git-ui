import { render, screen } from '@testing-library/react'
import mockdate from 'mockdate'
import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useRepoParams } from '../../../../src/hooks/useParams'
import { Files } from '../../../../src/views/pages/Files'
import { mockFileMeta } from '../../../mocks'

vi.mock('../../../../src/hooks/useParams')

mockdate.set('2020-02-01T00:00:00.000Z')

describe('Files', () => {
  beforeEach(() => {
    vi.mocked(useRepoParams).mockReturnValue({ repo: 'repo', branch: 'branch', path: 'path' })
  })

  it('should render file name', () => {
    render(<Files files={[mockFileMeta()]} />)
    expect(screen.getByText('name1')).toBeInTheDocument()
  })

  it('should render last commit message', () => {
    render(<Files files={[mockFileMeta()]} />)
    expect(screen.getByText('message1')).toBeInTheDocument()
  })

  it('should render last commit date', () => {
    render(<Files files={[mockFileMeta()]} />)
    expect(screen.getByText('about 1 year ago')).toBeInTheDocument()
  })

  it('should render link', () => {
    render(<Files files={[mockFileMeta()]} />)
    expect(screen.getAllByRole('link')[0]).toHaveAttribute('href', '/repo/repo/branch/tree?path=path1')
  })

  it('should render icon', () => {
    render(<Files files={[mockFileMeta()]} />)
    expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', '/icons/icon1')
  })
})
