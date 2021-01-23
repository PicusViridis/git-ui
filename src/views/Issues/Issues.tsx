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
          <th>Priority</th>
          <th>Type</th>
          <th>Title</th>
          <th>Author</th>
          <th>Due date</th>
          <th>Creation date</th>
        </tr>
      </thead>
      <tbody>
        {!issues.length && (
          <td className="text-muted p-5" colSpan={6}>
            No issue found
          </td>
        )}
        {issues.map((issue) => (
          <tr key={issue.id}>
            <td>{issue.priority}</td>
            <td>{issue.type}</td>
            <td>
              <a href={`/repo/${repo}/issues/edit/${issue.id}`}>{issue.title}</a>
            </td>
            <td>{issue.author.username}</td>
            <td>{format(issue.release.dueDate, 'PPP')}</td>
            <td>{format(issue.createdAt, 'PPP')}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
