import React from 'react'
import { Table } from 'reactstrap'

interface IFileProps {
  file: IFilesProps['files'][number]
  query: string
}

function File({ file, query }: IFileProps) {
  const search = new URLSearchParams(query)
  search.set('path', file.path)
  return (
    <tr>
      <td>
        <span className="icon">
          <img src={`/icons/${file.icon}`} width="16" height="16" />
        </span>
        <a href={`/${file.type === 'folder' ? 'files' : `file`}?${search.toString()}`}>{file.name}</a>
      </td>
      <td>{file.lastCommit.message}</td>
      <td>{file.lastCommit.date}</td>
    </tr>
  )
}

export interface IFilesProps {
  files: {
    path: string
    name: string
    type: 'file' | 'folder'
    icon: string
    lastCommit: {
      message: string
      date: string
    }
  }[]
  query: string
}

export default function Files({ files, query }: IFilesProps): JSX.Element {
  return (
    <Table striped>
      <tbody>
        {files.map((file) => (
          <File key={file.path} file={file} query={query} />
        ))}
      </tbody>
    </Table>
  )
}
