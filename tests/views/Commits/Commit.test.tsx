import { render, screen } from '@testing-library/react'
import React from 'react'
import Diff from '../../../src/views/Commits/Commit'
import { mockRepositoryMeta } from '../../mocks/fixtures'

describe('Diff', () => {
  it('Should render HTML diff', () => {
    render(<Diff diff="<p>Coucou</p>" repo={mockRepositoryMeta} />)
    expect(screen.queryByText('Coucou')).toBeInTheDocument()
  })
})
