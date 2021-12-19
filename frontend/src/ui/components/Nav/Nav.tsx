import { Breadcrumb, BreadcrumbProps, Breadcrumbs, Tab, Tabs } from '@blueprintjs/core'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { Page } from '../../../../../models/Pages'
import { BranchSelector } from '../BranchSelector/BranchSelector'
import { useNav } from './useNav'

export interface INavProps {
  page: Page
}

export function Nav({ page }: INavProps): JSX.Element | null {
  const { onTabChange, repo, branch, path, breadcrumb } = useNav(page)

  return (
    <nav className="my2 flex items-center">
      <Tabs animate large selectedTabId={page} onChange={onTabChange}>
        <Tab id="tree" title="Files" />
        <Tab id="commits" title="Commits" />
      </Tabs>
      <Breadcrumbs
        items={breadcrumb}
        className="ml-auto mr-auto"
        breadcrumbRenderer={renderBreadcrumb}
        minVisibleItems={2}
      />
      <BranchSelector repo={repo} branch={branch} page={page} path={path} />
    </nav>
  )
}

function renderBreadcrumb({ href, ...props }: BreadcrumbProps) {
  if (!href || props.current) return <Breadcrumb {...props} />
  return (
    <NavLink to={href}>
      <Breadcrumb {...props} />
    </NavLink>
  )
}
