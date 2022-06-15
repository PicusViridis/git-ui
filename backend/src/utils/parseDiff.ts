import { ICommitDiff } from '../../../models/Commit'

export function parseDiff(diff: string) {
  const lines = diff.split('\n')
  const files: ICommitDiff['files'] = []

  let i = 0
  while (lines[i]) {
    if (lines[i].startsWith('diff --git')) {
      do {
        i++
      } while (!lines[i].startsWith('---'))
      const nameL = lines[i].replace(/^--- (a\/)?/, '')
      i++
      const nameR = lines[i].replace(/^\+\+\+ (b\/)?/, '')
      const name = parseName(nameL, nameR)
      const status = parseStatus(nameL, nameR)
      const file: ICommitDiff['files'][number] = { name, status, lines: [] }
      i++
      let [nL, nR] = parseNumber(lines[i])
      i++

      while (lines[i] && !lines[i].startsWith('diff --git')) {
        const line: ICommitDiff['files'][number]['lines'][number] = { left: { t: 'empty' }, right: { t: 'empty' } }
        if (lines[i].startsWith('@@')) {
          ;[nL, nR] = parseNumber(lines[i])
          line.left = { t: 'gap' }
          line.right = { t: 'gap' }
        } else if (/^\s/.test(lines[i])) {
          line.left = { n: nL++, v: lines[i].slice(1) }
          line.right = { n: nR++, v: lines[i].slice(1) }
        } else if (lines[i].startsWith('-')) {
          line.left = { t: 'remove', n: nL++, v: lines[i].slice(1) }
          if (lines[i + 1]?.startsWith('+')) {
            line.right = { t: 'add', n: nR++, v: lines[i + 1].slice(1) }
            i++
          }
        } else if (lines[i].startsWith('+')) {
          line.right = { t: 'add', n: nR++, v: lines[i].slice(1) }
          if (lines[i + 1]?.startsWith('-')) {
            line.left = { t: 'remove', n: nL++, v: lines[i + 1].slice(1) }
            i++
          }
        }
        file.lines.push(line)
        i++
      }

      files.push(file)
    }

    i++
  }

  return files
}

function parseStatus(nameL: string, nameR: string) {
  if (nameL === nameR) return 'changed'
  if (nameL === '/dev/null') return 'added'
  if (nameR === '/dev/null') return 'removed'
  return 'renamed'
}

function parseName(nameL: string, nameR: string) {
  if (nameL === nameR) return nameL
  if (nameL === '/dev/null') return nameR
  if (nameR === '/dev/null') return nameL
  return `${nameL} > ${nameR}`
}

function parseNumber(line: string) {
  const [, nL = 0, nR = 0] = line.match(/^@@\s-(\d+),\d+\s\+(\d+),\d+\s@@/) || []
  return [Number(nL), Number(nR)]
}
