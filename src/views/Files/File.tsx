import React from 'react'
import { Alert, Card, CardHeader } from 'reactstrap'

interface IFileProps {
  size?: string
  content?: string
  query: string
}

export default function File({ size, content, query }: IFileProps): JSX.Element {
  const fileContent = content ? (
    <pre className="hljs m-0" dangerouslySetInnerHTML={{ __html: content }} />
  ) : (
    <Alert color="info" fade={false}>
      Cannot preview binary file.
    </Alert>
  )

  return (
    <Card>
      <CardHeader>
        <a style={{ float: 'right' }} href={`/file/download?${query}`}>
          <i className="fas fa-download"></i> Download file
        </a>
        {size}
      </CardHeader>
      {fileContent}
    </Card>
  )
}
