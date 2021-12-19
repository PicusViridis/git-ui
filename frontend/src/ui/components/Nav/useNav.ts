import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Page } from '../../../../../models/Pages'
import { useRepoParams } from '../../../hooks/useParams'
import { toBreadcrumb } from '../../../utils/breadcrumbs'
import { makeUrl } from '../../../utils/utils'

export function useNav(page: Page) {
  const { repo, branch, path } = useRepoParams()
  const navigate = useNavigate()
  const breadcrumb = useMemo(() => toBreadcrumb(repo, branch, page, path), [repo, branch, page, path])

  const onTabChange = useCallback(
    (tabId: string) => navigate(makeUrl(repo, branch, tabId, path)),
    [navigate, repo, branch, path]
  )

  return { onTabChange, repo, branch, path, breadcrumb }
}
