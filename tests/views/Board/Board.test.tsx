import { render, screen } from '@testing-library/react'
import mockdate from 'mockdate'
import React from 'react'
import Board, { IBoardProps } from '../../../src/views/Board/Board'
import { mockIssue1, mockIssue2, mockRelease } from '../../mocks/fixtures'

mockdate.set('2020-01-01T00:00:00.000Z')

describe('Board', () => {
  const props: IBoardProps = {
    release: mockRelease,
    issues: [mockIssue1, mockIssue2],
    repo: 'repo',
  }

  it('should render message when no release', () => {
    render(<Board {...props} release={undefined} />)
    expect(screen.getByText('No suitable release found')).toBeInTheDocument()
  })

  it('should render release name', () => {
    render(<Board {...props} />)
    expect(screen.getByText('release1')).toBeInTheDocument()
  })

  it('should render release date', () => {
    render(<Board {...props} />)
    expect(screen.getByText('(February 1st, 2021)')).toBeInTheDocument()
  })

  it('should render tickets', () => {
    render(<Board {...props} />)
    expect(screen.getByText('title1')).toBeInTheDocument()
    expect(screen.getByText('title2')).toBeInTheDocument()
  })
})
