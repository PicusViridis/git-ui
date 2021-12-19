import { useFetch } from '@saramorillon/hooks'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Repos } from '../../../../../src/ui/pages/Repos/Repos'
import { mock, mockRepo1, mockRepo2, routerWrapper } from '../../../../mocks'

jest.mock('@saramorillon/hooks')

describe('Home', () => {
  it('should show loader when loading', () => {
    mock(useFetch).mockReturnValue([[], { loading: true }])
    render(<Repos />, { wrapper: routerWrapper })
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('should render repo name', () => {
    mock(useFetch).mockReturnValue([[mockRepo1, mockRepo2], { loading: false }])
    render(<Repos />, { wrapper: routerWrapper })
    expect(screen.getByText('repo1')).toBeInTheDocument()
    expect(screen.getByText('repo2')).toBeInTheDocument()
  })

  it('should render repo link', () => {
    mock(useFetch).mockReturnValue([[mockRepo1, mockRepo2], { loading: false }])
    render(<Repos />, { wrapper: routerWrapper })
    expect(screen.getByText('repo1')).toHaveAttribute('href', '/repo/repo1/master/tree')
    expect(screen.getByText('repo2')).toHaveAttribute('href', '/repo/repo2/master/tree')
  })

  it('should render repo date', () => {
    mock(useFetch).mockReturnValue([[mockRepo1, mockRepo2], { loading: false }])
    render(<Repos />, { wrapper: routerWrapper })
    expect(screen.getByText('Updated Jan 1, 2019')).toBeInTheDocument()
    expect(screen.getByText('Updated Jan 1, 2020')).toBeInTheDocument()
  })
})
