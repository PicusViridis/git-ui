import React from 'react'
import { Container, Table } from 'reactstrap'
import { IFile, IRepositoryMeta } from '../../models/interfaces'
import Layout from './Layout'

interface IFileProps {
  file: IFile
  repo: IRepositoryMeta
}

function File({ file, repo }: IFileProps) {
  const href = file.type === 'folder' ? 'files' : 'file'
  return (
    <tr>
      <td>
        <span className="icon">
          <img src={`/icons/${file.icon}`} width="16" height="16" />
        </span>
        <a href={`/repo/${repo.name}/${href}/${repo.branch}?path=${file.path}`}>{file.name}</a>
      </td>
      <td>{file.lastCommit.message}</td>
      <td>{file.lastCommit.date}</td>
    </tr>
  )
}

interface IFilesProps {
  files: IFile[]
  repo: IRepositoryMeta
}

export default function Files({ files, repo }: IFilesProps): JSX.Element {
  return (
    <Layout repo={repo} active="files">
      <Container>
        <Table striped>
          <tbody>
            {files.map((file) => (
              <File key={file.path} file={file} repo={repo} />
            ))}
          </tbody>
        </Table>
      </Container>
    </Layout>
  )
}
