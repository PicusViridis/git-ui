import React from 'react'
import { Download } from 'react-feather'
import { Card, CardHeader } from 'reactstrap'

export interface IFileProps {
  size: string
  content: string
  repo: string
  branch: string
  path: string
}

export default function File({ size, content, repo, branch, path }: IFileProps): JSX.Element {
  return (
    <Card>
      <CardHeader>
        <a style={{ float: 'right' }} href={`/repo/${repo}/${branch}/files/download?path=${path}`}>
          <Download size="1rem" className="mb-1" /> Download file
        </a>
        {size}
      </CardHeader>
      <pre className="hljs m-0" dangerouslySetInnerHTML={{ __html: content }} />
    </Card>
  )
}
