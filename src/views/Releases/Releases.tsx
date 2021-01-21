import { format } from 'date-fns'
import React from 'react'
import { Table } from 'reactstrap'
import { Release } from '../../models/Release'

interface IReleasesProps {
  releases: Release[]
  repo: string
}

export default function Releases({ releases, repo }: IReleasesProps): JSX.Element {
  return (
    <Table striped>
      <caption className="text-right" style={{ captionSide: 'top' }}>
        <a href={`/repo/${repo}/releases/edit`}>
          <i className="fas fa-plus"></i> Create release
        </a>
      </caption>
      <thead>
        <tr>
          <th>Name</th>
          <th>Creation date</th>
          <th>Due date</th>
        </tr>
      </thead>
      <tbody>
        {!releases.length && (
          <td className="text-muted p-5" colSpan={5}>
            No release found
          </td>
        )}
        {releases.map((release) => (
          <tr key={release.id}>
            <td>
              <a href={`/repo/${repo}/releases/edit/${release.id}`}>{release.name}</a>
            </td>
            <td>{format(release.createdAt, 'PPP')}</td>
            <td>{format(release.dueDate, 'PPP')}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
