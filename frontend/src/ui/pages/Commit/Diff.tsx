import c from 'classnames'
import { DiffFile } from 'diff2html/lib/types'
import React, { Fragment } from 'react'
import { parseLines, parseName, parseStatus } from '../../../utils/parseDiff'

export interface IDiffProps {
  diff: Pick<DiffFile, 'oldName' | 'newName' | 'blocks'>
}

export function Diff({ diff }: IDiffProps) {
  const name = parseName(diff.oldName, diff.newName)
  const label = parseStatus(diff.oldName, diff.newName)
  const lines = parseLines(diff.blocks)

  return (
    <article className="my2 p0 pb1">
      <div className="pb1 pt2 px2">
        <mark className={c('right', 'badge', label)}>{label.toUpperCase()}</mark>
        <span>{name}</span>
      </div>
      <hr />
      <div className="diff">
        {lines.map((line, i) => (
          <div key={i}>
            {line.map((cell, j) => (
              <Fragment key={j}>
                <span className={c('px2', cell.t)}>{cell.n}</span>
                <span className={c('px2', cell.t)}>{cell.v?.replace(/\+|-/, ' ')}</span>
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </article>
  )
}
