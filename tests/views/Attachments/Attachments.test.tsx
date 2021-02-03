import { render, screen } from '@testing-library/react'
import React from 'react'
import { Attachments, IAttachmentsProps } from '../../../src/views/Attachments/Attachments'
import { mockAttachment1 } from '../../mocks/fixtures'

describe('Attachments', () => {
  const props: IAttachmentsProps = {
    issueId: 1,
    attachments: [mockAttachment1],
    repo: 'repo',
  }

  it('should render nothing if no attachments', () => {
    const { baseElement } = render(<Attachments {...props} attachments={[]} />)
    expect(baseElement.firstChild).toBeEmptyDOMElement()
  })

  it('should render attachments', () => {
    render(<Attachments {...props} />)
    expect(screen.getByText('filename')).toBeInTheDocument()
  })

  it('should render download link', () => {
    render(<Attachments {...props} />)
    expect(screen.getByText('Download all').parentElement).toHaveAttribute(
      'href',
      '/repo/repo/attachments/download?issueId=1'
    )
  })
})
