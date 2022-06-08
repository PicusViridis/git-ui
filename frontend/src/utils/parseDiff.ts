import { DiffBlock, DiffLine, LineType } from 'diff2html/lib/types'

export function parseName(oldName: string, newName: string) {
  if (oldName === newName) return oldName
  if (oldName === '/dev/null') return newName
  if (newName === '/dev/null') return oldName
  return `${oldName} > ${newName}`
}

export function parseStatus(oldName: string, newName: string): string {
  if (oldName === newName) return 'changed'
  if (oldName === '/dev/null') return 'added'
  if (newName === '/dev/null') return 'deleted'
  return 'renamed'
}

export interface IDiffCell {
  n?: number
  v?: string
  t?: 'empty' | 'add' | 'remove'
}
type DiffCells = [IDiffCell, IDiffCell]

export function parseLines(blocks: Pick<DiffBlock, 'lines'>[]) {
  const lines: DiffCells[] = []
  for (const block of blocks) {
    for (let i = 0; i < block.lines.length; i++) {
      const line = block.lines[i]
      const next = block.lines.at(i + 1)
      if (line.type === LineType.CONTEXT) {
        lines.push(empty(line))
      } else if (line.type === LineType.DELETE) {
        if (next?.type === LineType.INSERT) {
          lines.push(replace(line, next))
          i++
        } else {
          lines.push(replace(line))
        }
      } else if (line.type === LineType.INSERT) {
        if (next?.type === LineType.DELETE) {
          lines.push(replace(next, line))
          i++
        } else {
          lines.push(replace(undefined, line))
        }
      }
    }
  }
  return lines
}

function empty(line: DiffLine): DiffCells {
  return [
    { n: line.oldNumber, v: line.content },
    { n: line.newNumber, v: line.content },
  ]
}

function replace(left?: DiffLine, right?: DiffLine): DiffCells {
  return [
    left ? { n: left.oldNumber, v: left.content, t: 'remove' } : { t: 'empty' },
    right ? { n: right.newNumber, v: right.content, t: 'add' } : { t: 'empty' },
  ]
}
