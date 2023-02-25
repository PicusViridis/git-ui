import { screen } from '@testing-library/react'
import React from 'react'
import { getRepositories } from '../../../../src/services/repository'
import { Repos } from '../../../../src/views/pages/Repos'
import { mock, mockRepo1, mockRepo2, renderAsync, routerWrapper } from '../../../mocks'

jest.mock('../../../../src/services/repository')

describe('Repos', () => {
  beforeEach(() => {
    mock(getRepositories).mockResolvedValue([mockRepo1, mockRepo2])
  })

  it('should render repo name', async () => {
    await renderAsync(<Repos />, { wrapper: routerWrapper })
    expect(screen.getByText('repo1')).toHaveAttribute('href', '/repo/repo1/master/tree')
    expect(screen.getByText('repo2')).toHaveAttribute('href', '/repo/repo2/master/tree')
  })

  it('should render repo date', async () => {
    await renderAsync(<Repos />, { wrapper: routerWrapper })
    expect(screen.getByText('Updated Jan 1, 2019')).toBeInTheDocument()
    expect(screen.getByText('Updated Jan 1, 2020')).toBeInTheDocument()
  })
})
