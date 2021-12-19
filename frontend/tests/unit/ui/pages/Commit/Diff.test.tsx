import { useTheme } from '@saramorillon/hooks'
import { render, screen } from '@testing-library/react'
import { DiffFile } from 'diff2html/lib/types'
import React from 'react'
import { Diff } from '../../../../../src/ui/pages/Commit/Diff'
import { parseLines, parseName, parseStatus } from '../../../../../src/utils/parseDiff'
import { mock } from '../../../../mocks'

jest.mock('@saramorillon/hooks')
jest.mock('../../../../../src/utils/parseDiff')

const diff: Pick<DiffFile, 'oldName' | 'newName' | 'blocks'> = {
  blocks: [],
  oldName: 'oldName',
  newName: 'newName',
}

describe('Diff', () => {
  beforeEach(() => {
    mock(useTheme).mockReturnValue('theme')
    mock(parseName).mockReturnValue('Diff name')
    mock(parseStatus).mockReturnValue(['Diff status', 'primary'])
    mock(parseLines).mockReturnValue([
      [{ value: 'value1' }, { value: 'value2' }, { value: 'value3' }, { value: 'value4' }],
    ])
  })

  it('should parse diff name', () => {
    render(<Diff diff={diff} />)
    expect(parseName).toHaveBeenCalledWith('oldName', 'newName')
  })

  it('should render diff name', () => {
    render(<Diff diff={diff} />)
    expect(screen.getByText('Diff name')).toBeInTheDocument()
  })

  it('should parse diff status', () => {
    render(<Diff diff={diff} />)
    expect(parseStatus).toHaveBeenCalledWith('oldName', 'newName')
  })

  it('should render diff status', () => {
    render(<Diff diff={diff} />)
    expect(screen.getByText('Diff status')).toBeInTheDocument()
  })

  it('should parse diff lines', () => {
    render(<Diff diff={diff} />)
    expect(parseLines).toHaveBeenCalledWith([], 'theme')
  })

  it('should render diff lines', () => {
    render(<Diff diff={diff} />)
    expect(screen.getByText('value1')).toBeInTheDocument()
    expect(screen.getByText('value2')).toBeInTheDocument()
    expect(screen.getByText('value3')).toBeInTheDocument()
    expect(screen.getByText('value4')).toBeInTheDocument()
  })
})
