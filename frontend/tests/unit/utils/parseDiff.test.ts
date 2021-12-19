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
  it('should return CHANGED if old name and new name are equal', () => {
    expect(parseStatus('name', 'name')).toEqual(['CHANGED', 'warning'])
  })

  it('should return ADDED if old name is /dev/null', () => {
    expect(parseStatus('/dev/null', 'newName')).toEqual(['ADDED', 'success'])
  })

  it('should return DELETED if new name is /dev/null', () => {
    expect(parseStatus('oldName', '/dev/null')).toEqual(['DELETED', 'danger'])
  })

  it('should return RENAMED if name changed', () => {
    expect(parseStatus('oldName', 'newName')).toEqual(['RENAMED', 'warning'])
  })
})

describe('parseLines', () => {
  it('should return old number, content, new number and content if line is used as context', () => {
    const line: DiffLine = { type: LineType.CONTEXT, content: 'content', oldNumber: 1, newNumber: 2 }
    expect(parseLines([{ lines: [line] }], 'dark')).toEqual([
      [{ value: 1 }, { value: 'content' }, { value: 2 }, { value: 'content' }],
    ])
  })

  it('should return old number, content, next line new number and next line content if line has been deleted and next line has been inserted', () => {
    const line: DiffLine = { type: LineType.DELETE, content: 'content', oldNumber: 1, newNumber: undefined }
    const nextLine: DiffLine = { type: LineType.INSERT, content: 'next content', oldNumber: undefined, newNumber: 2 }
    expect(parseLines([{ lines: [line, nextLine] }], 'dark')).toEqual([
      [
        { value: 1, color: '#A82A2A66' },
        { value: 'content', color: '#A82A2A66' },
        { value: 2, color: '#1D732466' },
        { value: 'next content', color: '#1D732466' },
      ],
    ])
  })

  it('should return old number and content if line has been deleted and next line has not been inserted', () => {
    const line: DiffLine = { type: LineType.DELETE, content: 'content', oldNumber: 1, newNumber: undefined }
    expect(parseLines([{ lines: [line] }], 'dark')).toEqual([
      [
        { value: 1, color: '#A82A2A66' },
        { value: 'content', color: '#A82A2A66' },
        { value: ' ', color: '#394B5966' },
        { value: ' ', color: '#394B5966' },
      ],
    ])
  })

  it('should return next line old number, next line content, new number and content if line has been inserted and next line has been deleted', () => {
    const line: DiffLine = { type: LineType.INSERT, content: 'content', oldNumber: undefined, newNumber: 1 }
    const nextLine: DiffLine = { type: LineType.DELETE, content: 'next content', oldNumber: 2, newNumber: undefined }
    expect(parseLines([{ lines: [line, nextLine] }], 'dark')).toEqual([
      [
        { value: 2, color: '#A82A2A66' },
        { value: 'next content', color: '#A82A2A66' },
        { value: 1, color: '#1D732466' },
        { value: 'content', color: '#1D732466' },
      ],
    ])
  })

  it('should return new number and content if line has been inserted and next line has not been deleted', () => {
    const line: DiffLine = { type: LineType.INSERT, content: 'content', oldNumber: undefined, newNumber: 1 }
    expect(parseLines([{ lines: [line] }], 'dark')).toEqual([
      [
        { value: ' ', color: '#394B5966' },
        { value: ' ', color: '#394B5966' },
        { value: 1, color: '#1D732466' },
        { value: 'content', color: '#1D732466' },
      ],
    ])
  })
})
