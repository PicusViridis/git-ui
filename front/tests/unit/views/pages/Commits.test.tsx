import { useCopy, usePagination } from '@saramorillon/hooks'
import { fireEvent, screen } from '@testing-library/react'
import mockdate from 'mockdate'
import React from 'react'
import { useRepoParams } from '../../../../src/hooks/useParams'
import { getCommits } from '../../../../src/services/commit'
import { Commits } from '../../../../src/views/pages/Commits'
import { mock, mockCommit1, mockPagination, renderAsync, routerWrapper } from '../../../mocks'

mockdate.set('2019-02-01T00:00:00.000Z')

jest.mock('../../../../src/hooks/useParams')
jest.mock('../../../../src/services/commit')

describe('Commits', () => {
  beforeEach(() => {
    mock(useCopy).mockReturnValue([false, { loading: false }, jest.fn()])
    mock(usePagination).mockReturnValue(mockPagination())
    mock(useRepoParams).mockReturnValue({ repo: 'repo', branch: 'branch', path: 'path' })
    mock(getCommits).mockResolvedValue({ commits: [mockCommit1], total: 0 })
  })

  it('should get commits', async () => {
    await renderAsync(<Commits />, { wrapper: routerWrapper })
    expect(getCommits).toHaveBeenCalledWith('repo', 'branch', 1, 10, 'path')
  })

  it('should render commit message', async () => {
    await renderAsync(<Commits />, { wrapper: routerWrapper })
    expect(screen.getByText('message1')).toHaveAttribute('href', '/repo/repo/branch/commit/hash1?path=path')
  })

  it('should render commit date', async () => {
    await renderAsync(<Commits />, { wrapper: routerWrapper })
    expect(screen.getByText('Commited about 1 month ago by')).toBeInTheDocument()
  })

  it('should render commit author', async () => {
    await renderAsync(<Commits />, { wrapper: routerWrapper })
    expect(screen.getByText('author1')).toBeInTheDocument()
  })

  it('should render commit hash', async () => {
    await renderAsync(<Commits />, { wrapper: routerWrapper })
    expect(screen.getByText('hash1')).toBeInTheDocument()
  })

  it('should disable hash button if copy is not authorized', async () => {
    await renderAsync(<Commits />, { wrapper: routerWrapper })
    expect(screen.getByText('hash1')).toBeDisabled()
  })

  it('should enable hash button if copy is authorized', async () => {
    mock(useCopy).mockReturnValue([true, { loading: false }, jest.fn()])
    await renderAsync(<Commits />, { wrapper: routerWrapper })
    expect(screen.getByText('hash1')).toBeEnabled()
  })

  it('should copy hash to clipboard when clicking on hash button', async () => {
    const copy = jest.fn()
    mock(useCopy).mockReturnValue([true, { loading: false }, copy])
    await renderAsync(<Commits />, { wrapper: routerWrapper })
    fireEvent.click(screen.getByText('hash1'))
    expect(copy).toHaveBeenCalledWith('hash1')
  })

  it('should render current and max page', async () => {
    await renderAsync(<Commits />, { wrapper: routerWrapper })
    expect(screen.getByText('Page 1 of 10')).toBeInTheDocument()
  })

  it('should disable first button if cannot go previous', async () => {
    await renderAsync(<Commits />, { wrapper: routerWrapper })
    expect(screen.getByLabelText('First')).toBeDisabled()
  })

  it('should not disable first button if can go previous', async () => {
    mock(usePagination).mockReturnValue(mockPagination({ canPrevious: true }))
    await renderAsync(<Commits />, { wrapper: routerWrapper })
    expect(screen.getByLabelText('First')).toBeEnabled()
  })

  it('should disable previous button if cannot go previous', async () => {
    await renderAsync(<Commits />, { wrapper: routerWrapper })
    expect(screen.getByLabelText('Previous')).toBeDisabled()
  })

  it('should not disable previous button if can go previous', async () => {
    mock(usePagination).mockReturnValue(mockPagination({ canPrevious: true }))
    await renderAsync(<Commits />, { wrapper: routerWrapper })
    expect(screen.getByLabelText('Previous')).toBeEnabled()
  })

  it('should disable next button if cannot go next', async () => {
    await renderAsync(<Commits />, { wrapper: routerWrapper })
    expect(screen.getByLabelText('Next')).toBeDisabled()
  })

  it('should not disable next button if can go next', async () => {
    mock(usePagination).mockReturnValue(mockPagination({ canNext: true }))
    await renderAsync(<Commits />, { wrapper: routerWrapper })
    expect(screen.getByLabelText('Next')).toBeEnabled()
  })

  it('should disable last button if cannot go next', async () => {
    await renderAsync(<Commits />, { wrapper: routerWrapper })
    expect(screen.getByLabelText('Last')).toBeDisabled()
  })

  it('should not disable last button if can go next', async () => {
    mock(usePagination).mockReturnValue(mockPagination({ canNext: true }))
    await renderAsync(<Commits />, { wrapper: routerWrapper })
    expect(screen.getByLabelText('Last')).toBeEnabled()
  })

  it('should go to first page when clicking on first', async () => {
    const pagination = mockPagination({ canPrevious: true })
    mock(usePagination).mockReturnValue(pagination)
    await renderAsync(<Commits />, { wrapper: routerWrapper })
    fireEvent.click(screen.getByLabelText('First'))
    expect(pagination.first).toHaveBeenCalled()
  })

  it('should go to previous page when clicking on previous', async () => {
    const pagination = mockPagination({ canPrevious: true })
    mock(usePagination).mockReturnValue(pagination)
    await renderAsync(<Commits />, { wrapper: routerWrapper })
    fireEvent.click(screen.getByLabelText('Previous'))
    expect(pagination.previous).toHaveBeenCalled()
  })

  it('should go to next page when clicking on next', async () => {
    const pagination = mockPagination({ canNext: true })
    mock(usePagination).mockReturnValue(pagination)
    await renderAsync(<Commits />, { wrapper: routerWrapper })
    fireEvent.click(screen.getByLabelText('Next'))
    expect(pagination.next).toHaveBeenCalled()
  })

  it('should go to last page when clicking on last', async () => {
    const pagination = mockPagination({ canNext: true })
    mock(usePagination).mockReturnValue(pagination)
    await renderAsync(<Commits />, { wrapper: routerWrapper })
    fireEvent.click(screen.getByLabelText('Last'))
    expect(pagination.last).toHaveBeenCalled()
  })
})
