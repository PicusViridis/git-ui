import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { useBranches } from '../../../../../src/ui/components/BranchSelector/useBranches'
import { BranchSelector } from '../../../../src/ui/components/BranchSelector'
import { mock } from '../../../mocks'

jest.mock('../../../../../src/ui/components/BranchSelector/useBranches')

describe('BrancheSelector', () => {
  it('should show loader when loading', () => {
    mock(useBranches).mockReturnValue({ loading: true, branches: [], onChange: jest.fn() })
    render(<BranchSelector repo="repo" branch="branch" page="commits" path="path" />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('should render branches', () => {
    mock(useBranches).mockReturnValue({ loading: false, branches: ['branch1', 'branch2'], onChange: jest.fn() })
    render(<BranchSelector repo="repo" branch="branch" page="commits" path="path" />)
    expect(screen.getByText('branch1')).toBeInTheDocument()
    expect(screen.getByText('branch2')).toBeInTheDocument()
  })

  it('should selected active branch', () => {
    mock(useBranches).mockReturnValue({ loading: false, branches: ['branch1', 'branch2'], onChange: jest.fn() })
    render(<BranchSelector repo="repo" branch="branch1" page="commits" path="path" />)
    expect(screen.getByDisplayValue('branch1')).toBeInTheDocument()
  })

  it('should change active branch', () => {
    const onChange = jest.fn()
    mock(useBranches).mockReturnValue({ loading: false, branches: ['branch1', 'branch2'], onChange })
    render(<BranchSelector repo="repo" branch="branch1" page="commits" path="path" />)
    fireEvent.change(screen.getByDisplayValue('branch1'), { target: { value: 'branch2' } })
    expect(onChange).toHaveBeenCalledWith('branch2')
  })
})
