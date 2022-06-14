import { DiffLine, LineType } from 'diff2html/lib/types'
import { parseLines, parseName, parseStatus } from '../../../src/utils/parseDiff'

describe('parseName', () => {
  it('should return old name if old name and new name are equal', () => {
    expect(parseName('name', 'name')).toBe('name')
  })

  it('should return new name if old name is /dev/null', () => {
    expect(parseName('/dev/null', 'newName')).toBe('newName')
  })

  it('should return old name if new name is /dev/null', () => {
    expect(parseName('oldName', '/dev/null')).toBe('oldName')
  })

  it('should return old name > new name if name changed', () => {
    expect(parseName('oldName', 'newName')).toBe('oldName > newName')
  })
})

describe('parseStatus', () => {
  it('should return "changed" if old name and new name are equal', () => {
    expect(parseStatus('name', 'name')).toBe('changed')
  })

  it('should return "added" if old name is /dev/null', () => {
    expect(parseStatus('/dev/null', 'newName')).toBe('added')
  })

  it('should return "deleted" if new name is /dev/null', () => {
    expect(parseStatus('oldName', '/dev/null')).toBe('deleted')
  })

  it('should return "renamed" if name changed', () => {
    expect(parseStatus('oldName', 'newName')).toBe('renamed')
  })
})

describe('parseLines', () => {
  it('should return an empty line if line is used for context', () => {
    const line: DiffLine = { type: LineType.CONTEXT, content: 'content', oldNumber: 1, newNumber: 2 }
    expect(parseLines([{ lines: [line] }])).toEqual([
      [
        { n: 1, v: 'content' },
        { n: 2, v: 'content' },
      ],
    ])
  })

  it('should return a diff line if line has been deleted and a other line has been inserted', () => {
    const line: DiffLine = { type: LineType.DELETE, content: 'content', oldNumber: 1, newNumber: undefined }
    const next: DiffLine = { type: LineType.INSERT, content: 'new content', oldNumber: undefined, newNumber: 2 }
    expect(parseLines([{ lines: [line, next] }])).toEqual([
      [
        { n: 1, v: 'content', t: 'remove' },
        { n: 2, v: 'new content', t: 'add' },
      ],
    ])
  })

  it('should return a diff line if line has been deleted and no other line has been inserted', () => {
    const line: DiffLine = { type: LineType.DELETE, content: 'content', oldNumber: 1, newNumber: undefined }
    expect(parseLines([{ lines: [line] }])).toEqual([[{ n: 1, v: 'content', t: 'remove' }, { t: 'empty' }]])
  })

  it('should return a diff line if line has been inserted and an other line has been deleted', () => {
    const line: DiffLine = { type: LineType.INSERT, content: 'content', oldNumber: undefined, newNumber: 1 }
    const next: DiffLine = { type: LineType.DELETE, content: 'old content', oldNumber: 2, newNumber: undefined }
    expect(parseLines([{ lines: [line, next] }])).toEqual([
      [
        { n: 2, v: 'old content', t: 'remove' },
        { n: 1, v: 'content', t: 'add' },
      ],
    ])
  })

  it('should return a diff line if line has been inserted and no other line has been deleted', () => {
    const line: DiffLine = { type: LineType.DELETE, content: 'content', oldNumber: 1, newNumber: undefined }
    expect(parseLines([{ lines: [line] }])).toEqual([[{ n: 1, v: 'content', t: 'remove' }, { t: 'empty' }]])
  })
})
