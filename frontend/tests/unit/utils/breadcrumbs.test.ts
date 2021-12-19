import { toBreadcrumb } from '../../../src/utils/breadcrumbs'

describe('toBreadcrumb', () => {
  it('should return repo name as current if path is not provided', () => {
    expect(toBreadcrumb('repo', 'branch', 'tree')).toEqual([{ text: 'repo', current: true }])
  })

  it('should return repo name as current if path is .', () => {
    expect(toBreadcrumb('repo', 'branch', 'tree', '.')).toEqual([{ text: 'repo', current: true }])
  })

  it('should return all breadcrumb elements', () => {
    expect(toBreadcrumb('repo', 'branch', 'tree', 'path')).toEqual([
      { text: 'repo', href: '/repo/repo/branch/tree' },
      { text: 'path', href: '/repo/repo/branch/tree?path=path', current: true },
    ])
  })
})
