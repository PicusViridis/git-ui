import React from 'react'
import { Card, CardHeader } from 'reactstrap'

interface IFileProps {
  size?: string
  content?: string
  repo: string
  branch: string
  path: string
}

export default function File({ size, content, repo, branch, path }: IFileProps): JSX.Element {
  return (
    <Card>
      <CardHeader>
        <a style={{ float: 'right' }} href={`/repo/${repo}/${branch}/files?path=${path}`}>
          <i className="fas fa-download"></i> Download file
        </a>
        {size}
      </CardHeader>
      <pre className="hljs m-0" dangerouslySetInnerHTML={{ __html: content || 'Cannot preview binary file' }} />
    </Card>
  )
}
