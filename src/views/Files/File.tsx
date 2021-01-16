import React from 'react'
import { Card, CardHeader } from 'reactstrap'
import { IRepositoryMeta } from '../../models/interfaces'
import Layout from '../Layout/RepoLayout'
import { getQueryString } from '../utils'

interface IFileContentProps {
  content: string
}

function FileContent({ content }: IFileContentProps) {
  if (content) {
    return <pre className="panel-block hljs m-0" dangerouslySetInnerHTML={{ __html: content }} />
  }
  return (
    <div className="panel-block notification">
      <p>Cannot preview binary file.</p>
    </div>
  )
}

interface IFileProps {
  size?: string
  content?: string
  meta: IRepositoryMeta
}

export default function File({ size, content, meta }: IFileProps): JSX.Element {
  const query = getQueryString(meta)
  return (
    <Layout meta={meta} active="files">
      <Card>
        <CardHeader>
          <a style={{ float: 'right' }} href={`/file/download?${query}`}>
            <i className="fas fa-download"></i> Download file
          </a>
          {size}
        </CardHeader>
        <FileContent content={content} />
      </Card>
    </Layout>
  )
}
