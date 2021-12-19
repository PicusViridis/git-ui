import { Button, Classes, Divider } from '@blueprintjs/core'
import c from 'classnames'
import { formatDistance, parseISO } from 'date-fns'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { ICommit } from '../../../../../models/Commit'
import { useCopy } from '../../../hooks/useCopy'
import { makeUrl } from '../../../utils/utils'

export interface ICommitProps {
  commit: ICommit
  repo: string
  branch: string
  path?: string
}

export function Commit({ commit, repo, branch, path }: ICommitProps) {
  const [authorized, { loading }, copy] = useCopy()

  return (
    <>
      <div className="flex justify-between items-center py1">
        <div>
          <NavLink to={makeUrl(repo, branch, `commit/${commit.hash}`, path)}>{commit.message}</NavLink>
          <br />
          <span className={c(Classes.SMALL, Classes.TEXT_MUTED)}>
            Commited {formatDistance(parseISO(commit.date), Date.now(), { addSuffix: true })} by <b>{commit.author}</b>
          </span>
        </div>
        <Button
          icon="clipboard"
          className={Classes.MONOSPACE_TEXT}
          outlined
          disabled={!authorized}
          onClick={() => copy(commit.hash)}
          loading={loading}
        >
          {commit.hash.slice(0, 7)}
        </Button>
      </div>
      <Divider className="my1" />
    </>
  )
}
