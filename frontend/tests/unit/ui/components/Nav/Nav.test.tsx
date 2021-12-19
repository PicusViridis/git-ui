import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { IBranchSelectorProps } from '../../../../../src/ui/components/BranchSelector/BranchSelector'
import { Nav } from '../../../../../src/ui/components/Nav/Nav'
import { useNav } from '../../../../../src/ui/components/Nav/useNav'
import { mock, mockBreadcrumb1, mockBreadcrumb2, routerWrapper } from '../../../../mocks'

jest.mock('../../../../../src/ui/components/Nav/useNav')
jest.mock('../../../../../src/ui/components/BranchSelector/BranchSelector', () => ({
  BranchSelector: (props: IBranchSelectorProps) => (
    <div>
      {props.repo} {props.branch} {props.page} {props.path}
    </div>
  ),
}))

describe('Nav', () => {
  beforeEach(() => {
    mock(useNav).mockReturnValue({ breadcrumb: [] })
  })

  it('should render active tab', () => {
    render(<Nav page="tree" />, { wrapper: routerWrapper })
    expect(screen.getAllByRole('tab')[0]).toHaveAttribute('aria-selected', 'true')
    expect(screen.getAllByRole('tab')[1]).toHaveAttribute('aria-selected', 'false')
  })

  it('should change tab when clicking on tab', () => {
    const onTabChange = jest.fn()
    mock(useNav).mockReturnValue({ breadcrumb: [], onTabChange })
    render(<Nav page="tree" />, { wrapper: routerWrapper })
    fireEvent.click(screen.getAllByRole('tab')[1])
    expect(onTabChange).toHaveBeenCalledWith('commits', 'tree', expect.any(Object))
  })

  it('should render breadcrumb elements', () => {
    mock(useNav).mockReturnValue({ breadcrumb: [mockBreadcrumb1, mockBreadcrumb2] })
    render(<Nav page="tree" />, { wrapper: routerWrapper })
    expect(screen.getByText('breadcrumb1')).toBeInTheDocument()
    expect(screen.getByText('breadcrumb2')).toBeInTheDocument()
  })

  it('should render link for non current breadcrumb element', () => {
    mock(useNav).mockReturnValue({ breadcrumb: [mockBreadcrumb1, mockBreadcrumb2] })
    render(<Nav page="tree" />, { wrapper: routerWrapper })
    expect(screen.getByText('breadcrumb1').parentElement).toHaveAttribute('href')
  })

  it('should not render link for current breadcrumb element', () => {
    mock(useNav).mockReturnValue({ breadcrumb: [mockBreadcrumb1, mockBreadcrumb2] })
    render(<Nav page="tree" />, { wrapper: routerWrapper })
    expect(screen.getByText('breadcrumb2').parentElement).not.toHaveAttribute('href')
  })

  it('should render branch selector', () => {
    mock(useNav).mockReturnValue({ breadcrumb: [], repo: 'repo', branch: 'branch', path: 'path' })
    render(<Nav page="tree" />, { wrapper: routerWrapper })
    expect(screen.getByText('repo branch tree path')).toBeInTheDocument()
  })
})
