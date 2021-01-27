import { differenceInDays, format } from 'date-fns'
import React, { CSSProperties } from 'react'
import { Table } from 'reactstrap'
import { Issue } from '../../models/Issue'
import { colors } from '../Board/Ticket'

const bulletStyle: CSSProperties = {
  display: 'inline-block',
  width: '1rem',
  height: '1rem',
  borderRadius: '0.5rem',
}

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
          <th>Title</th>
          <th>Author</th>
          <th>Due date</th>
          <th>Creation date</th>
        </tr>
      </thead>
      <tbody>
        {!issues.length && (
          <td className="text-muted p-5" colSpan={4}>
            No issue found
          </td>
        )}
        {issues.map((issue) => (
          <tr key={issue.id}>
            <td>
              <a href={`/repo/${repo}/issues/edit/${issue.id}`}>
                <span style={bulletStyle} className={`bg-${colors[issue.type]}`} /> {issue.title}
              </a>
            </td>
            <td>{issue.author.username}</td>
            <td className={differenceInDays(issue.release.dueDate, new Date()) <= 7 ? 'text-danger' : ''}>
              {format(issue.release.dueDate, 'PPP')}
            </td>
            <td>{format(issue.createdAt, 'PPP')}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
