import { Colors, Intent } from '@blueprintjs/core'
import { Theme } from '@saramorillon/hooks'
import { DiffBlock, LineType } from 'diff2html/lib/types'

export function parseName(oldName: string, newName: string) {
  if (oldName === newName) return oldName
  if (oldName === '/dev/null') return newName
  if (newName === '/dev/null') return oldName
  return `${oldName} > ${newName}`
}

export function parseStatus(oldName: string, newName: string): [string, Intent] {
  if (oldName === newName) return ['CHANGED', 'warning']
  if (oldName === '/dev/null') return ['ADDED', 'success']
  if (newName === '/dev/null') return ['DELETED', 'danger']
  return ['RENAMED', 'warning']
}

const colors = {
  dark: {
    red: Colors.RED1 + '66',
    green: Colors.FOREST1 + '66',
    gray: Colors.DARK_GRAY5 + '66',
  },
  light: {
    red: Colors.RED5 + '66',
    green: Colors.FOREST5 + '66',
    gray: Colors.LIGHT_GRAY1 + '66',
  },
}

export type IDiffCell = { value: number | string; color?: string }
type DiffCells = [IDiffCell, IDiffCell, IDiffCell, IDiffCell]

export function parseLines(blocks: Pick<DiffBlock, 'lines'>[], theme: Theme) {
  const palette = colors[theme]
  const lines: DiffCells[] = []
  for (const block of blocks) {
    for (let i = 0; i < block.lines.length; i++) {
      const line = block.lines[i]
      const nextLine = block.lines[i + 1]
      switch (line.type) {
        case LineType.CONTEXT:
          lines.push([
            { value: line.oldNumber },
            { value: line.content },
            { value: line.newNumber },
            { value: line.content },
          ])
          break
        case LineType.DELETE:
          if (nextLine?.type === LineType.INSERT) {
            lines.push([
              { value: line.oldNumber, color: palette.red },
              { value: line.content, color: palette.red },
              { value: nextLine.newNumber, color: palette.green },
              { value: nextLine.content, color: palette.green },
            ])
            i++
          } else {
            lines.push([
              { value: line.oldNumber, color: palette.red },
              { value: line.content, color: palette.red },
              { value: ' ', color: palette.gray },
              { value: ' ', color: palette.gray },
            ])
          }
          break
        case LineType.INSERT:
          if (nextLine?.type === LineType.DELETE) {
            lines.push([
              { value: nextLine.oldNumber, color: palette.red },
              { value: nextLine.content, color: palette.red },
              { value: line.newNumber, color: palette.green },
              { value: line.content, color: palette.green },
            ])
            i++
          } else {
            lines.push([
              { value: ' ', color: palette.gray },
              { value: ' ', color: palette.gray },
              { value: line.newNumber, color: palette.green },
              { value: line.content, color: palette.green },
            ])
          }
          break
      }
    }
  }
  return lines
}
