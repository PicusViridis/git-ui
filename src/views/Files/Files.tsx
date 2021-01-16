import React from 'react'
import { Table } from 'reactstrap'

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
          <tr key={file.path}>
            <td>
              <span className="icon">
                <img src={`/icons/${file.icon}`} width="16" height="16" />
              </span>
              <a href={`/${file.type === 'folder' ? 'files' : `file`}?${query}`}>{file.name}</a>
            </td>
            <td>{file.lastCommit.message}</td>
            <td>{file.lastCommit.date}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
