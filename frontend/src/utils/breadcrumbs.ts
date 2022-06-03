import { Page } from '../../../models/Pages'
import { makeUrl } from './utils'

export function toBreadcrumb(
  repo: string,
  branch: string,
  activeTab: Page,
  currentPath = '.'
): { text: string; href?: string }[] {
  if (currentPath === '.') {
    return [{ text: repo }]
  }
  const result: { text: string; href?: string }[] = [{ text: repo, href: makeUrl(repo, branch, activeTab) }]
  const parts = currentPath.split('/')
  for (let i = 0; i < parts.length; i++) {
    result.push({
      text: parts[i],
      href: i === parts.length - 1 ? undefined : makeUrl(repo, branch, activeTab, parts.slice(0, i + 1).join('/')),
    })
  }
  return result
}
