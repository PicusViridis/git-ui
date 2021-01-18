import React from 'react'
import { Table } from 'reactstrap'
import { Issue } from '../../models/Issue'

interface IIssuesProps {
  issues: Issue[]
  query: string
}

export default function Issues({ issues, query }: IIssuesProps): JSX.Element {
  return (
    <Table striped>
      <caption className="text-right" style={{ captionSide: 'top' }}>
        <a href={`/issues/add?${query}`}>
          <i className="fas fa-plus"></i> Create issue
        </a>
      </caption>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {!issues.length && (
          <td className="text-muted p-5" colSpan={3}>
            No issue found
          </td>
        )}
        {issues.map((issue) => (
          <tr key={issue.id}>
            <td>{issue.title}</td>
            <td>{issue.author}</td>
            <td>{issue.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
