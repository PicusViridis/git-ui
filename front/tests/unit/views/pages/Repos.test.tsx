import { render, screen } from '@testing-library/react'
import React from 'react'
import { getRepositories } from '../../../../src/services/repository'
import { Repos } from '../../../../src/views/pages/Repos'
import { mockRepo, wait } from '../../../mocks'

jest.mock('../../../../src/services/repository')

describe('Repos', () => {
  beforeEach(() => {
    jest
      .mocked(getRepositories)
      .mockResolvedValue([mockRepo(), mockRepo({ name: 'repo2', updatedAt: '2020-01-01T00:00:00.000Z' })])
  })

  it('should get repositories', async () => {
    render(<Repos />)
    await wait()
    expect(getRepositories).toHaveBeenCalledWith()
  })

  it('should render loader when loading', async () => {
    render(<Repos />)
    expect(screen.getByText('Loading repositories')).toBeInTheDocument()
    await wait()
  })

  it('should render error on fetch error', async () => {
    jest.mocked(getRepositories).mockRejectedValue('Error')
    render(<Repos />)
    await wait()
    expect(screen.getByText('Error while loading repositories')).toBeInTheDocument()
  })

  it('should render not found when no repo is found', async () => {
    jest.mocked(getRepositories).mockResolvedValue([])
    render(<Repos />)
    await wait()
    expect(screen.getByText('No repository found')).toBeInTheDocument()
  })

  it('should render repo name', async () => {
    render(<Repos />)
    await wait()
    expect(screen.getByText('repo1')).toHaveAttribute('href', '/repo/repo1/master/tree')
    expect(screen.getByText('repo2')).toHaveAttribute('href', '/repo/repo2/master/tree')
  })

  it('should render repo date', async () => {
    render(<Repos />)
    await wait()
    expect(screen.getByText('Updated Jan 1, 2019')).toBeInTheDocument()
    expect(screen.getByText('Updated Jan 1, 2020')).toBeInTheDocument()
  })
})
