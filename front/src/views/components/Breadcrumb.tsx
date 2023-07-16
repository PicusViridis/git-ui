import { useFetch } from '@saramorillon/hooks'
import React, { useCallback, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { usePage } from '../../hooks/usePage'
import { useRepoParams } from '../../hooks/useParams'
import { getBranches } from '../../services/branch'
import { makeUrl } from '../../utils/utils'

export function Breadcrumb(): JSX.Element | null {
  const page = usePage()
  const { repo, branch, path } = useRepoParams()
  const fetch = useCallback(() => getBranches(repo), [repo])
  const [branches, { loading }] = useFetch(fetch, [])
  const navigate = useNavigate()

  const onChange = useCallback(
    (branch: string) => {
      navigate(makeUrl(repo, branch, page, path))
    },
    [navigate, repo, page, path]
  )

  const breadcrumb = useMemo(
    () =>
      path.split('/').map((part, index, parts) => ({
        text: part,
        href: index < parts.length - 1 ? parts.slice(0, index + 1).join('/') : undefined,
      })),
    [path]
  )

  return (
    <>
      <div className="flex items-center">
        {breadcrumb.length > 1 && (
          <nav aria-label="Breadcrumb">
            <ul>
              <li>
                <Link to={makeUrl(repo, branch, page)}>{repo}</Link>
              </li>
              {breadcrumb.map((item, key) => (
                <li key={key}>
                  {item.href ? <Link to={makeUrl(repo, branch, page, item.href)}>{item.text}</Link> : item.text}
                </li>
              ))}
            </ul>
          </nav>
        )}
        <div className="ml-auto">
          <label aria-busy={loading} aria-label="Branch">
            <select
              value={branch}
              onChange={(e) => onChange(e.target.value)}
              disabled={loading || branches.length < 2}
              className="p1 mt1"
            >
              {branches.map((branch) => (
                <option key={branch.name} value={branch.name}>
                  {branch.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </>
  )
}
