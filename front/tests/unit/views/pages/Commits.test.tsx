import { useCopy, usePagination } from '@saramorillon/hooks'
import { fireEvent, render, screen } from '@testing-library/react'
import mockdate from 'mockdate'
import React from 'react'
import { useRepoParams } from '../../../../src/hooks/useParams'
import { getCommits } from '../../../../src/services/commit'
import { Commits } from '../../../../src/views/pages/Commits'
import { mockCommit, mockPagination, wait } from '../../../mocks'

mockdate.set('2019-02-01T00:00:00.000Z')

jest.mock('../../../../src/hooks/useParams')
jest.mock('../../../../src/services/commit')

describe('Commits', () => {
  beforeEach(() => {
    jest.mocked(useCopy).mockReturnValue([false, { loading: false }, jest.fn()])
    jest.mocked(usePagination).mockReturnValue(mockPagination())
    jest.mocked(useRepoParams).mockReturnValue({ repo: 'repo', branch: 'branch', path: 'path' })
    jest.mocked(getCommits).mockResolvedValue({ commits: [mockCommit()], total: 100 })
  })

  it('should get commits', async () => {
    render(<Commits />)
    await wait()
    expect(getCommits).toHaveBeenCalledWith('repo', 'branch', 1, 10, 'path')
  })

  it('should render commit message', async () => {
    render(<Commits />)
    await wait()
    expect(screen.getByText('message1')).toHaveAttribute('href', '/repo/repo/branch/commit/hash1?path=path')
  })

  it('should render commit date', async () => {
    render(<Commits />)
    await wait()
    expect(screen.getByText('Commited about 1 month ago by')).toBeInTheDocument()
  })

  it('should render commit author', async () => {
    render(<Commits />)
    await wait()
    expect(screen.getByText('author1')).toBeInTheDocument()
  })

  it('should render commit hash', async () => {
    render(<Commits />)
    await wait()
    expect(screen.getByText('hash1')).toBeInTheDocument()
  })

  it('should disable hash button if copy is not authorized', async () => {
    render(<Commits />)
    await wait()
    expect(screen.getByText('hash1')).toBeDisabled()
  })

  it('should enable hash button if copy is authorized', async () => {
    jest.mocked(useCopy).mockReturnValue([true, { loading: false }, jest.fn()])
    render(<Commits />)
    await wait()
    expect(screen.getByText('hash1')).toBeEnabled()
  })

  it('should copy hash to clipboard when clicking on hash button', async () => {
    const copy = jest.fn()
    jest.mocked(useCopy).mockReturnValue([true, { loading: false }, copy])
    render(<Commits />)
    await wait()
    fireEvent.click(screen.getByText('hash1'))
    expect(copy).toHaveBeenCalledWith('hash1')
  })

  it('should render current and max page', async () => {
    render(<Commits />)
    await wait()
    expect(screen.getByText('Page 1 of 10')).toBeInTheDocument()
  })

  it('should disable first button if cannot go previous', async () => {
    render(<Commits />)
    await wait()
    expect(screen.getByLabelText('First')).toBeDisabled()
  })

  it('should not disable first button if can go previous', async () => {
    jest.mocked(usePagination).mockReturnValue(mockPagination({ canPrevious: true }))
    render(<Commits />)
    await wait()
    expect(screen.getByLabelText('First')).toBeEnabled()
  })

  it('should disable previous button if cannot go previous', async () => {
    render(<Commits />)
    await wait()
    expect(screen.getByLabelText('Previous')).toBeDisabled()
  })

  it('should not disable previous button if can go previous', async () => {
    jest.mocked(usePagination).mockReturnValue(mockPagination({ canPrevious: true }))
    render(<Commits />)
    await wait()
    expect(screen.getByLabelText('Previous')).toBeEnabled()
  })

  it('should disable next button if cannot go next', async () => {
    render(<Commits />)
    await wait()
    expect(screen.getByLabelText('Next')).toBeDisabled()
  })

  it('should not disable next button if can go next', async () => {
    jest.mocked(usePagination).mockReturnValue(mockPagination({ canNext: true }))
    render(<Commits />)
    await wait()
    expect(screen.getByLabelText('Next')).toBeEnabled()
  })

  it('should disable last button if cannot go next', async () => {
    render(<Commits />)
    await wait()
    expect(screen.getByLabelText('Last')).toBeDisabled()
  })

  it('should not disable last button if can go next', async () => {
    jest.mocked(usePagination).mockReturnValue(mockPagination({ canNext: true }))
    render(<Commits />)
    await wait()
    expect(screen.getByLabelText('Last')).toBeEnabled()
  })

  it('should go to first page when clicking on first', async () => {
    const pagination = mockPagination({ canPrevious: true })
    jest.mocked(usePagination).mockReturnValue(pagination)
    render(<Commits />)
    await wait()
    fireEvent.click(screen.getByLabelText('First'))
    expect(pagination.first).toHaveBeenCalled()
  })

  it('should go to previous page when clicking on previous', async () => {
    const pagination = mockPagination({ canPrevious: true })
    jest.mocked(usePagination).mockReturnValue(pagination)
    render(<Commits />)
    await wait()
    fireEvent.click(screen.getByLabelText('Previous'))
    expect(pagination.previous).toHaveBeenCalled()
  })

  it('should go to next page when clicking on next', async () => {
    const pagination = mockPagination({ canNext: true })
    jest.mocked(usePagination).mockReturnValue(pagination)
    render(<Commits />)
    await wait()
    fireEvent.click(screen.getByLabelText('Next'))
    expect(pagination.next).toHaveBeenCalled()
  })

  it('should go to last page when clicking on last', async () => {
    const pagination = mockPagination({ canNext: true })
    jest.mocked(usePagination).mockReturnValue(pagination)
    render(<Commits />)
    await wait()
    fireEvent.click(screen.getByLabelText('Last'))
    expect(pagination.last).toHaveBeenCalled()
  })
})
