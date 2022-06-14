import { useFetch } from '@saramorillon/hooks'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Empty } from '../../../../../src/ui/pages/Empty/Empty'
import { mock } from '../../../../mocks'

jest.mock('@saramorillon/hooks')

describe('Empty', () => {
  it('should show loader when loading', () => {
    mock(useFetch).mockReturnValue(['', { loading: true }])
    render(<Empty repo="repo" />)
    expect(screen.getByLabelText('Loading...')).toBeInTheDocument()
  })

  it('should render clone url', () => {
    mock(useFetch).mockReturnValue(['serverUrl', { loading: false }])
    render(<Empty repo="repo" />)
    expect(screen.getByText('git clone serverUrl/repo')).toBeInTheDocument()
  })

  it('should render remote url', () => {
    mock(useFetch).mockReturnValue(['serverUrl', { loading: false }])
    render(<Empty repo="repo" />)
    expect(screen.queryAllByText('git remote add origin serverUrl/repo')).toHaveLength(2)
  })
})
