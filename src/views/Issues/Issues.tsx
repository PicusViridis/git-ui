import { format } from 'date-fns'
import React from 'react'
import { Table } from 'reactstrap'
import { Issue } from '../../models/Issue'

interface IIssuesProps {
  issues: Issue[]
  repo: string
}

export default function Issues({ issues, repo }: IIssuesProps): JSX.Element {
  return (
    <Table striped>
      <caption className="text-right" style={{ captionSide: 'top' }}>
        <a href={`/repo/${repo}/issues/edit`}>
          <i className="fas fa-plus"></i> Create issue
        </a>
      </caption>
      <thead>
        <tr>
          <th>Type</th>
          <th>Title</th>
          <th>Author</th>
          <th>Creation date</th>
          <th>Due date</th>
        </tr>
      </thead>
      <tbody>
        {!issues.length && (
          <td className="text-muted p-5" colSpan={5}>
            No issue found
          </td>
        )}
        {issues.map((issue) => (
          <tr key={issue.id}>
            <td>{issue.type}</td>
            <td>
              <a href={`/repo/${repo}/issues/edit/${issue.id}`}>{issue.title}</a>
            </td>
            <td>{issue.author.username}</td>
            <td>{format(issue.createdAt, 'PPP')}</td>
            <td>{format(issue.release.dueDate, 'PPP')}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
