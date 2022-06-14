import { render, screen } from '@testing-library/react'
import { LineType } from 'diff2html/lib/types'
import React from 'react'
import { Diff, IDiffProps } from '../../../../../src/ui/pages/Commit/Diff'

describe('Diff', () => {
  it('should render diff name', () => {
    render(<Diff diff={{ blocks: [], oldName: 'oldName', newName: 'newName' }} />)
    expect(screen.getByText('oldName > newName')).toBeInTheDocument()
  })

  it('should render diff status', () => {
    render(<Diff diff={{ blocks: [], oldName: 'oldName', newName: 'newName' }} />)
    expect(screen.getByText('RENAMED')).toBeInTheDocument()
  })

  it('should render diff lines', () => {
    const diff: IDiffProps['diff'] = {
      blocks: [
        {
          header: '',
          lines: [{ type: LineType.INSERT, content: 'content', oldNumber: undefined, newNumber: 1 }],
          newStartLine: 0,
          oldStartLine: 0,
        },
      ],
      oldName: 'oldName',
      newName: 'newName',
    }
    render(<Diff diff={diff} />)
    expect(screen.getByText('1')).toHaveClass('add')
    expect(screen.getByText('content')).toHaveClass('add')
  })
})
