import { BreadcrumbProps } from '@blueprintjs/core'
import { Page } from '../../../models/Pages'
import { makeUrl } from './utils'

export function toBreadcrumb(repo: string, branch: string, activeTab: Page, currentPath = '.'): BreadcrumbProps[] {
  if (currentPath === '.') {
    return [{ text: repo, current: true }]
  }
  const result: BreadcrumbProps[] = [{ text: repo, href: makeUrl(repo, branch, activeTab) }]
  const parts = currentPath.split('/')
  for (let i = 0; i < parts.length; i++) {
    result.push({
      text: parts[i],
      href: makeUrl(repo, branch, activeTab, parts.slice(0, i + 1).join('/')),
      current: i === parts.length - 1,
    })
  }
  return result
}
