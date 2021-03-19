import Empty from '@/views/Repos/Empty'
import { render, screen } from '@testing-library/react'
import React from 'react'

describe('Empty', () => {
  it('should render clone url', () => {
    render(<Empty url="url" repo="repo" />)
    expect(screen.getByText('git clone url/repo')).toBeInTheDocument()
  })

  it('should render remote url', () => {
    render(<Empty url="url" repo="repo" />)
    expect(screen.queryAllByText('git remote add origin url/repo')).toHaveLength(2)
  })
})
