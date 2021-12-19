import { Card, Pre, Tag, TagProps } from '@blueprintjs/core'
import { useTheme } from '@saramorillon/hooks'
import { DiffFile } from 'diff2html/lib/types'
import React from 'react'
import { DiffCell, parseLines, parseName, parseStatus } from '../../../utils/parseDiff'

export interface IDiffProps {
  diff: Pick<DiffFile, 'oldName' | 'newName' | 'blocks'>
}

export function Diff({ diff }: IDiffProps) {
  const theme = useTheme()
  const name = parseName(diff.oldName, diff.newName)
  const [label, intent] = parseStatus(diff.oldName, diff.newName)
  const lines = parseLines(diff.blocks, theme)

  return (
    <div className="my2">
      <Card>
        {name} <Status intent={intent}>{label}</Status>
      </Card>
      <Pre className="m0 flex">
        <div>
          {lines.map((line, key) => (
            <DiffCell key={key} cell={line[0]} />
          ))}
        </div>
        <div className="overflow-auto" style={{ width: '50%' }}>
          {lines.map((line, key) => (
            <DiffCell key={key} cell={line[1]} />
          ))}
        </div>
        <div>
          {lines.map((line, key) => (
            <DiffCell key={key} cell={line[2]} />
          ))}
        </div>
        <div className="overflow-auto" style={{ width: '50%' }}>
          {lines.map((line, key) => (
            <DiffCell key={key} cell={line[3]} />
          ))}
        </div>
      </Pre>
    </div>
  )
}

function Status(props: TagProps) {
  return <Tag minimal className="right" style={{ fontSize: 10 }} {...props} />
}

interface IDiffLineProps {
  cell: DiffCell
}

function DiffCell({ cell }: IDiffLineProps) {
  return (
    <div className="px1" style={{ backgroundColor: cell.color }}>
      {cell.value}
    </div>
  )
}
