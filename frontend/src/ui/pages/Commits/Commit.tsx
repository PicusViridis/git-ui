import { useCopy } from '@saramorillon/hooks'
import { IconClipboard } from '@tabler/icons'
import { formatDistance, parseISO } from 'date-fns'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { ICommit } from '../../../../../models/Commit'
import { makeUrl } from '../../../utils/utils'

export interface ICommitProps {
  commit: ICommit
  repo: string
  branch: string
  path?: string
}

export function Commit({ commit, repo, branch, path }: ICommitProps) {
  const [authorized, , copy] = useCopy()

  return (
    <>
      <div className="flex justify-between items-center py1">
        <div>
          <NavLink to={makeUrl(repo, branch, `commit/${commit.hash}`, path)}>{commit.message}</NavLink>
          <br />
          <small>
            Commited {formatDistance(parseISO(commit.date), Date.now(), { addSuffix: true })} by <b>{commit.author}</b>
          </small>
        </div>
        <button disabled={!authorized} onClick={() => copy(commit.hash)} className="hash">
          <IconClipboard /> {commit.hash.slice(0, 7)}
        </button>
      </div>
      <hr />
    </>
  )
}
