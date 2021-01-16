import React from 'react'
import { Container, Table } from 'reactstrap'
import { IFile, IRepositoryMeta } from '../../models/interfaces'
import Layout from '../Layout/RepoLayout'
import { getQueryString } from '../utils'

interface IFileProps {
  file: IFile
  meta: IRepositoryMeta
}

function File({ file, meta }: IFileProps) {
  const { name, type, icon, lastCommit } = file
  const query = getQueryString(meta, file)
  return (
    <tr>
      <td>
        <span className="icon">
          <img src={`/icons/${icon}`} width="16" height="16" />
        </span>
        <a href={`/${type === 'folder' ? 'files' : `file`}?${query}`}>{name}</a>
      </td>
      <td>{lastCommit.message}</td>
      <td>{lastCommit.date}</td>
    </tr>
  )
}

interface IFilesProps {
  files: IFile[]
  meta: IRepositoryMeta
}

export default function Files({ files, meta }: IFilesProps): JSX.Element {
  return (
    <Layout meta={meta} active="files">
      <Container>
        <Table striped>
          <tbody>
            {files.map((file) => (
              <File key={file.path} file={file} meta={meta} />
            ))}
          </tbody>
        </Table>
      </Container>
    </Layout>
  )
}
