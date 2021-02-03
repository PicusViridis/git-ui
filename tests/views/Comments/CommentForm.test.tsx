import { render } from '@testing-library/react'
import React from 'react'
import { Comments, ICommentsProps } from '../../../src/views/Comments/Comments'

describe('Comments', () => {
  const props: ICommentsProps = {
    repo: 'repo',
    issueId: 1,
  }

  it('should set action url', () => {
    const { baseElement } = render(<Comments {...props} />)
    expect(baseElement.querySelector('form')).toHaveAttribute('action', '/repo/repo/comments/edit?issueId=1')
  })
})
