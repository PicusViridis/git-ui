import React from 'react'
import { Card, CardHeader } from 'reactstrap'

interface IFileProps {
  size?: string
  content?: string
  query: string
}

export default function File({ size, content, query }: IFileProps): JSX.Element {
  return (
    <Card>
      <CardHeader>
        <a style={{ float: 'right' }} href={`/file/download?${query}`}>
          <i className="fas fa-download"></i> Download file
        </a>
        {size}
      </CardHeader>
      <pre className="hljs m-0" dangerouslySetInnerHTML={{ __html: content || 'Cannot preview binary file' }} />
    </Card>
  )
}
